import { UserLinkEntity } from "@/entity/userLink"
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
      const links = await linkActions.getLinks()
      set({ links })
    } catch (error) {}
    set({ loading: false })
  },
  deleteLink: async (linkedUserId: number | string) => {
    set({ loading: true })
    try {
      await linkActions.deleteLink(linkedUserId)
      await get().getLinks()
    } catch (error) {}
    set({ loading: false })
  },
  createLink: async (linkedUserId: number | string) => {
    set({ loading: true })
    try {
      await linkActions.createLink(linkedUserId)
      await get().getLinks()
    } catch (error) {}
    set({ loading: false })
  },
}))

export default useUserLinksStore
