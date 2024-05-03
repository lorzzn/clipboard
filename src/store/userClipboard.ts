import { UserClipboardEntity } from "@/entity/userClipboard"
import { create } from "zustand"
import * as appActions from "../app/action"

type UserClipboardStoreType = {
  loading: boolean
  userClipboard: UserClipboardEntity
  getUserClipboard: () => Promise<void>
}

export const useUserClipboardStore = create<UserClipboardStoreType>((set) => ({
  loading: true,
  userClipboard: {
    data: [],
    userId: 0,
  },
  getUserClipboard: async () => {
    set({ loading: true })
    try {
      const userClipboard = await appActions.getUserClipboard()
      set({ userClipboard })
    } catch (error) {}
    set({ loading: false })
  },
}))

export default useUserClipboardStore
