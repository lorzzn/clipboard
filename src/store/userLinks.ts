import { UserLinkEntity } from "@/entity/userLink"
import mitter from "@/utils/mitter"
import { create } from "zustand"
import * as linkActions from "./../app/links/action"

type UserLinksStoreType = {
  links: UserLinkEntity[]
  loading: boolean
  getLinks: () => Promise<void>
  deleteLink: (linkedUserId: number | string) => Promise<void>
  createLink: (linkedUserId: number | string) => Promise<void>
}

const useUserLinksStore = create<UserLinksStoreType>((set, get) => ({
  links: [],
  loading: true,
  getLinks: async () => {
    set({ loading: true })
    try {
      const { ok, data } = await linkActions.getLinks()
      if (ok) {
        set({ links: data })
      } else {
        if (data.toast) {
          mitter.emit("app:toast", data.toast)
        }
      }
    } catch (error) {}
    set({ loading: false })
  },
  deleteLink: async (linkedUserId: number | string) => {
    set({ loading: true })
    try {
      const { ok, data } = await linkActions.deleteLink(linkedUserId)
      if (!ok && data.toast) {
        mitter.emit("app:toast", data.toast)
      }
      await get().getLinks()
    } catch (error) {}
    set({ loading: false })
  },
  createLink: async (linkedUserId: number | string) => {
    set({ loading: true })
    try {
      const { ok, data } = await linkActions.createLink(linkedUserId)
      if (!ok && data.toast) {
        mitter.emit("app:toast", data.toast)
      }
      await get().getLinks()
    } catch (error) {}
    set({ loading: false })
  },
}))

export default useUserLinksStore
