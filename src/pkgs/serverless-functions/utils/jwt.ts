import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { UserEntity } from "../../../entity/types/user"
import dayjs from 'dayjs'

export const secretKey = "a very secret key, definitely"
export const key = new TextEncoder().encode(secretKey)

export const tokenDuration = 3 * 60 // (s) 3 minutes
export const getTokenExpireDate = () => dayjs().add(tokenDuration, "second").toDate()

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

export async function getToken(session: string, mustExist: boolean = true) {
  if (mustExist && !session) {
    throw new Error("session not found")
  } else {
    return session && (await decrypt(session))
  }
}
