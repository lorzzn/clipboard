import { UserClipboardEntity } from "@/entity/userClipboard"
import { create } from "zustand"
import * as appActions from "../app/action"

type UserClipboardStoreType = {
  loading: boolean
  setLoading: (loading: boolean) => void
  clipboard: UserClipboardEntity
  setClipboard: (clipboard: UserClipboardEntity) => void
  getClipboard: () => Promise<void>
}

export const useUserClipboardStore = create<UserClipboardStoreType>((set) => ({
  loading: true,
  setLoading: (loading) => set({ loading }),
  clipboard: {
    data: [],
    userId: 0,
  },
  setClipboard: (clipboard: UserClipboardEntity) => set({ clipboard }),
  getClipboard: async () => {
    set({ loading: true })
    try {
      const clipboard = await appActions.getClipboard()
      set({ clipboard })
    } catch (error) {}
    set({ loading: false })
  },
}))

export default useUserClipboardStore
