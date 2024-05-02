import { withKeyPrefix } from "./../../../utils/key"
import dayjs from "dayjs"
import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { UserEntity } from "../../../entity/types/user"
import storage from "./storage"

export const secretKey = "a very secret key, definitely"
export const key = new TextEncoder().encode(secretKey)

export const sessionBlacklistPrefix = "session-blacklist"

export const tokenDuration = 60 * 60 // (s) 60 minutes
export const getTokenExpireDate = () => {
  return dayjs().add(tokenDuration, "second").toDate()
}

export type JWTSession = {
  user: UserEntity
  expires: Date
} & JWTPayload

export async function encrypt(payload: JWTSession) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expires)
    .sign(key)
}

export async function decrypt(input: string): Promise<JWTSession> {
  const { payload } = await jwtVerify<JWTSession>(input, key, {
    algorithms: ["HS256"],
  })
  return payload
}

export async function getSession(session: string, mustExist: boolean = true) {
  const isBlacked = await storage.hasItem(withKeyPrefix(sessionBlacklistPrefix, session))
  if (isBlacked) {
    throw new Error("session blacklisted")
  }
  if (mustExist && !session) {
    throw new Error("session not found")
  } else {
    return await decrypt(session)
  }
}
