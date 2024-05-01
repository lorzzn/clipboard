import { random, toNumber } from "lodash"
import User from "../../../entity/user"
import { randomString } from "../../../utils/string"
import { HandlerFunction } from "../types"
import { encrypt, getToken as getSession, getTokenExpireDate } from "../utils/jwt"
import storage from "../utils/storage"

const generateUserId = async (): Promise<number> => {
  const sub = randomString(5, "", "1234567890")
  const start = random(1, 9)
  const id = start.toString() + sub
  const user = new User({ id })
  const exist = await storage.hasItem(user.key)

  // if the id is taken, generate a new one
  if (exist) {
    return generateUserId()
  }
  return toNumber(id)
}

export const creaetOrUpdateSession: HandlerFunction = async (request, response) => {
  const session = await getSession(request.cookies.session, false)
  const user = new User(session?.user)
  const ua = request.headers["user-agent"]
  const ip = request.headers["x-forwarded-for"]

  let isValid = false
  if (session) {
    isValid = await storage.hasItem(user.key)
  }

  if (!isValid) {
    const user = new User({
      id: await generateUserId(),
      expiresAt: getTokenExpireDate(),
      ua,
      ip,
    })

    await storage.setItem(user.key, user.data)
    const session = await encrypt({
      user: user.data,
      expires: user.data.expiresAt,
    })

    response.status(200).json({
      user: user.data,
      session,
    })
  } else {
    session.expires = getTokenExpireDate()
    const user = new User(session.user)
    user.update({ ua, ip, expiresAt: session.expires })
    session.user = user.data

    response.status(200).json({
      user: user.data,
      session: await encrypt(session),
    })
  }
}
