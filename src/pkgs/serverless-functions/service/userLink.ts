import UserLink, { UserLinkEntity } from "../../../entity/userLink"
import storage from "../utils/storage"

export const create = async (userId: number, linkedUserId: number): Promise<UserLink> => {
  const link = new UserLink({
    userId,
    linkedUserId,
  })

  await storage.setItem(link.key, link.data)

  return link
}

export const getList = async (userId: number): Promise<UserLinkEntity[]> => {
  const ul = new UserLink({ userId })
  const s = await storage.getKeys(ul.baseKey)
  return (await storage.getItems<UserLinkEntity>(s)).map((item) => item.value)
}
