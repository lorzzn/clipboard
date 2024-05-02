import { withKeyPrefix } from "./../../../utils/key"
import { VercelRequest } from "@vercel/node"
import { random, toNumber, toString } from "lodash"
import { ClipboardResponse } from "../types/controller/clipboard"
import { SessionResponse } from "../types/controller/user"
import { encrypt, getSession, getTokenExpireDate, sessionBlacklistPrefix, tokenDuration } from "../utils/jwt"
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
  const _session = request.cookies.session
  const session = await getSession(_session)
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

  await storage.setItem(withKeyPrefix(sessionBlacklistPrefix, _session), 1, {
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

export const clipboardAction = async (request: VercelRequest): Promise<ClipboardResponse> => {
  const session = await getSession(request.cookies.session)
  const type = request.query.type as clipboardService.clipboardActionType
  const value = Buffer.from(toString(request.query.data), "base64").toString("utf-8")

  return await clipboardService.action(session.user.clipboardId, type, value)
}
