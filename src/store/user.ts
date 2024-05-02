import { UserClipboardEntity } from "@/entity/userClipboard"
import { UserEntity } from "@/entity/types/user"
import { create } from "zustand"
import * as appActions from "../app/action"

type UserStoreType = {
  user: UserEntity
  loading: boolean
  setUser: (user: UserEntity) => void
  setLoading: (loading: boolean) => void
  clipboard: UserClipboardEntity
  setClipboard: (clipboard: UserClipboardEntity) => void
  getClipboard: () => Promise<void>
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
  clipboard: {
    userId: 0,
    data: [],
  },
  setUser: (user: UserEntity) => set(() => ({ user })),
  setLoading: (loading: boolean) =>
    set(() => ({
      loading,
    })),
  setClipboard: (clipboard: UserClipboardEntity) =>
    set(() => ({
      clipboard,
    })),
  getClipboard: async () => {
    set(() => ({ loading: true }))
    try {
      const clipboard = await appActions.getClipboard()
      set(() => ({ clipboard }))
    } catch (error) {}
    set(() => ({ loading: false }))
  },
}))

export default useUserStore
