import { UserClipboardEntity } from "@/entity/userClipboard"
import mitter from "@/utils/mitter"
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
      const { ok, data } = await appActions.getUserClipboard()
      if (ok) {
        set({ userClipboard: data })
      } else {
        if (data.toast) {
          mitter.emit("app:toast", data.toast)
        }
      }
    } catch (error) {}
    set({ loading: false })
  },
}))

export default useUserClipboardStore
