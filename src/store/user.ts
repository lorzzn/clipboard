import { UserData } from "@/pkgs/serverless-functions/types/controller/user"
import mitter from "@/utils/mitter"
import cookie from "js-cookie"
import { create } from "zustand"
import * as appActions from "../app/action"

type UserStoreType = {
  user: UserData
  loading: boolean
  done: boolean
  hasError: boolean
  getUser: () => Promise<void>
  deteleUser: () => Promise<void>
  computed: {
    ok: boolean
  }
}

const useUserStore = create<UserStoreType>((set, get) => ({
  user: {
    id: 0,
    clipboardId: 0,
    expiresAt: new Date(0),
    ip: "",
    ua: "",
  },
  loading: true,
  done: false,
  hasError: false,
  getUser: async () => {
    set({ loading: true })
    try {
      const { ok, data } = await appActions.getSession()
      if (ok) {
        const { user, session } = data
        cookie.set("session", session, {
          expires: new Date(user.expiresAt),
        })
        set({ user })
      } else {
        if (data.toast) {
          mitter.emit("app:toast", data.toast)
        }
      }
    } catch (error) {
      set({ hasError: true })
    }
    set({ loading: false, done: true })
  },
  deteleUser: async () => {
    set({ loading: true })
    try {
      const { ok, data } = await appActions.deleteUser()
      if (!ok && data.toast) {
        mitter.emit("app:toast", data.toast)
      }
      cookie.remove("session")
      window.location.href = "/"
    } catch (error) {}
    set({ loading: false, done: true })
  },
  computed: {
    get ok() {
      return get().done && !get().hasError
    },
  },
}))

export default useUserStore
