import User from "@/entity/user"
import UserLink from "@/entity/userLink"
import { VercelRequest } from "@vercel/node"
import { toNumber } from "lodash"
import { getSession } from "../utils/jwt"
import storage from "../utils/storage"

export const create = async (request: VercelRequest) => {
  const session = await getSession(request.cookies.session)
  const userId = toNumber(request.query.userId)

  const user = new User({ id: userId })
  const exist = await storage.hasItem(user.key)

  if (!exist) {
    throw new Error("User not found")
  }

  const ur = new UserLink({
    userId: userId,
    linkedUserId: session.user.id,
  })

  const ttl = 60 * 60
  await storage.setItem(ur.key, ur.data, {
    ttl,
  })
  return {
    userId: userId,
    relatedUserId: session.user.id,
    ttl,
  }
}
