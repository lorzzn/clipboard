import UserLink, { UserLinkEntity } from "../../../entity/userLink"
import RuntimeError from "../../runtime-error"
import storage from "../utils/storage"

export const create = async (userId: number, linkedUserId: number): Promise<UserLink> => {
  const linkFromThere = new UserLink({
    userId: linkedUserId,
    linkedUserId: userId,
  })

  await storage.setItem(linkFromThere.key, linkFromThere.data)

  return linkFromThere
}

export const deleteLink = async (userId: number, linkedUserId: number): Promise<UserLink> => {
  const link = new UserLink({
    userId,
    linkedUserId,
  })
  const linkFromThere = new UserLink({
    userId: linkedUserId,
    linkedUserId: userId,
  })

  await storage.removeItem(link.key)
  await storage.removeItem(linkFromThere.key)

  return link
}

export const getList = async (userId: number): Promise<UserLinkEntity[]> => {
  const ul = new UserLink({ userId })
  const s = await storage.getKeys(ul.baseKey)
  return (await storage.getItems<UserLinkEntity>(s)).map((item) => item.value)
}

export const updateLink = async (userId: number, linkedUserId: number) => {
  const linkFromHere = new UserLink({
    userId,
    linkedUserId,
    status: 1,
  })

  if (!(await storage.hasItem(linkFromHere.key))) {
    throw new RuntimeError({
      message: "User link not found",
      toast: {
        title: "You are not linked with this user",
        status: "error",
      },
    })
  }

  const linkFromThere = new UserLink({
    userId: linkedUserId,
    linkedUserId: userId,
    status: 1,
  })

  await storage.setItem(linkFromHere.key, linkFromHere.data)
  await storage.setItem(linkFromThere.key, linkFromThere.data)
}
