import { UserData } from "@/pkgs/serverless-functions/types/controller/user"
import cookie from "js-cookie"
import { create } from "zustand"
import * as appActions from "../app/action"

type UserStoreType = {
  user: UserData
  loading: boolean
  done: boolean
  hasError: boolean
  getUser: () => Promise<void>
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
      const { user, session } = await appActions.getSession()
      cookie.set("session", session, {
        expires: new Date(user.expiresAt),
      })
      set({ user })
    } catch (error) {
      set({ hasError: true })
    }
    set({ loading: false, done: true })
  },
  computed: {
    get ok() {
      return get().done && !get().hasError
    },
  },
}))

export default useUserStore
