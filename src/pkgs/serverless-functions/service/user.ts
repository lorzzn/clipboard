import { VercelRequest } from "@vercel/node"
import { random, toNumber } from "lodash"
import { ClipboardResponse } from "../types/controller/clipboard"
import { SessionResponse } from "../types/controller/user"
import { encrypt, getSession, getTokenExpireDate, tokenDuration } from "../utils/jwt"
import storage from "../utils/storage"
import User from "./../../../entity/user"
import { randomString } from "./../../../utils/string"
import * as clipboardService from "./clipboard"

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

export const createSession = async (request: VercelRequest): Promise<SessionResponse> => {
  const ua = request.headers["user-agent"]
  const ip = request.headers["x-forwarded-for"]
  const clipboard = await clipboardService.create()

  const user = new User({
    id: await generateUserId(),
    expiresAt: getTokenExpireDate(),
    clipboardId: clipboard.data.id,
    ua,
    ip,
  })

  // create record in redis
  await storage.setItem(user.key, user.data, {
    ttl: tokenDuration,
  })

  const session = await encrypt({
    user: user.data,
    expires: user.data.expiresAt,
  })

  return {
    user: user.data,
    session,
  }
}

export const updateSession = async (request: VercelRequest): Promise<SessionResponse> => {
  const session = await getSession(request.cookies.session)
  const user = new User(session.user)
  const ua = request.headers["user-agent"]
  const ip = request.headers["x-forwarded-for"]

  // refresh expire date
  session.expires = getTokenExpireDate()
  user.update({ ua, ip, expiresAt: session.expires })
  session.user = user.data

  // refresh clipboard ttl
  try {
    await clipboardService.refreshTTL(session.user.clipboardId)
  } catch (error) {
    const clipboard = await clipboardService.create()
    session.user.clipboardId = clipboard.data.id
  }

  // update record
  await storage.setItem(user.key, user.data, {
    ttl: tokenDuration,
  })

  return {
    user: user.data,
    session: await encrypt(session),
  }
}

export const getClipboard = async (request: VercelRequest): Promise<ClipboardResponse> => {
  const session = await getSession(request.cookies.session)
  const data = await clipboardService.getClipboard(session.user.clipboardId)

  return data
}
