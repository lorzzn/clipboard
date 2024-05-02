import { ClipboardEntity } from "@/entity/clipboard"
import { UserEntity } from "@/entity/types/user"
import { create } from "zustand"
import * as appActions from "../app/action"

type UserStoreType = {
  user: UserEntity
  loading: boolean
  setUser: (user: UserEntity) => void
  setLoading: (loading: boolean) => void
  clipboard: ClipboardEntity
  setClipboard: (clipboard: ClipboardEntity) => void
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
    id: 0,
    data: [],
  },
  setUser: (user: UserEntity) => set(() => ({ user })),
  setLoading: (loading: boolean) =>
    set(() => ({
      loading,
    })),
  setClipboard: (clipboard: ClipboardEntity) =>
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
