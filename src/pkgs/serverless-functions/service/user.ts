import { VercelRequest } from "@vercel/node"
import { random, toNumber, toString } from "lodash"
import { SessionResponse, UserLinkResponse } from "../types/controller/user"
import { encrypt, getSession, getTokenExpireDate, sessionBlacklistPrefix, tokenDuration } from "../utils/jwt"
import storage from "../utils/storage"
import User from "./../../../entity/user"
import { withKeyPrefix } from "./../../../utils/key"
import { randomString } from "./../../../utils/string"
import * as userClipboardService from "./userClipboard"
import * as userLinkService from "./userLink"

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

  const user = new User({
    id: await generateUserId(),
    expiresAt: getTokenExpireDate(),
    ua,
    ip,
  })

  await userClipboardService.create(user.data.id)

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

  // update record
  await storage.setItem(user.key, user.data, {
    ttl: tokenDuration,
  })

  // add old session to blacklist
  await storage.setItem(withKeyPrefix(sessionBlacklistPrefix, _session), 1, {
    ttl: tokenDuration,
  })

  return {
    user: user.data,
    session: await encrypt(session),
  }
}

export const getClipboard = async (request: VercelRequest): Promise<UserLinkResponse> => {
  const session = await getSession(request.cookies.session)
  try {
    return (await userClipboardService.getClipboard(session.user.id)).data
  } catch (error) {
    return (await userClipboardService.create(session.user.id)).data
  }
}

export const userClipboardAction = async (request: VercelRequest): Promise<UserLinkResponse> => {
  const session = await getSession(request.cookies.session)
  const type = request.query.type as userClipboardService.UserClipboardActionType
  const value = Buffer.from(toString(request.query.data), "base64").toString("utf-8")

  return await userClipboardService.action(session.user.id, type, value)
}

export const createLink = async (request: VercelRequest): Promise<UserLinkResponse> => {
  const session = await getSession(request.cookies.session)
  const linkedUserId = request.query.linkedUserId

  return (await userLinkService.create(session.user.id, toNumber(linkedUserId))).data
}

export const getLinkList = async (request: VercelRequest): Promise<UserLinkResponse[]> => {
  const session = await getSession(request.cookies.session)
  return await userLinkService.getList(session.user.id)
}
