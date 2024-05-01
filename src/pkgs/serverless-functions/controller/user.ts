import { random, toNumber } from "lodash"
import User from "../../../entity/user"
import { randomString } from "../../../utils/string"
import { HandlerFunction } from "../types"
import { encrypt, getSession, getTokenExpireDate } from "../utils/jwt"
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

export const createSession: HandlerFunction = async (request, response) => {
  const ua = request.headers["user-agent"]
  const ip = request.headers["x-forwarded-for"]
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
}

export const updateSession: HandlerFunction = async (request, response) => {
  const session = await getSession(request.cookies.session, false)
  const user = new User(session.user)
  const ua = request.headers["user-agent"]
  const ip = request.headers["x-forwarded-for"]

  // refresh expire date
  session.expires = getTokenExpireDate()
  user.update({ ua, ip, expiresAt: session.expires })
  session.user = user.data

  response.status(200).json({
    user: user.data,
    session: await encrypt(session),
  })
}

export const session: HandlerFunction = async (request, response) => {
  try {
    await updateSession(request, response)
  } catch (error) {
    await createSession(request, response)
  }
}
