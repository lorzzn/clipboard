import { UserEntity } from "@/entity/types/user"
import { UserData } from "@/pkgs/serverless-functions/types/controller/user"
import cookie from "js-cookie"
import { create } from "zustand"
import * as appActions from "../app/action"

type UserStoreType = {
  user: UserData
  loading: boolean
  setUser: (user: UserEntity) => void
  getUser: () => Promise<void>
  setLoading: (loading: boolean) => void
}

const useUserStore = create<UserStoreType>((set) => ({
  user: {
    id: 0,
    clipboardId: 0,
    expiresAt: new Date(0),
    ip: "",
    ua: "",
  },
  loading: true,
  setUser: (user: UserEntity) => set(() => ({ user })),
  getUser: async () => {
    set({ loading: true })
    try {
      const { user, session } = await appActions.getSession()
      cookie.set("session", session, {
        expires: new Date(user.expiresAt),
      })
      set({ user })
    } catch (error) {}
    set({ loading: false })
  },
  setLoading: (loading: boolean) => set({ loading }),
}))

export default useUserStore
