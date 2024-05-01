import { JWTPayload, jwtVerify } from "jose"
import { UserEntity } from "../../../entity/types/user"

export const secretKey = "a very secret key, definitely"
export const key = new TextEncoder().encode(secretKey)

export type JWTSession = {
  user: UserEntity
  expires: Date
} & JWTPayload

export async function decrypt(input: string): Promise<JWTSession> {
  const { payload } = await jwtVerify<JWTSession>(input, key, {
    algorithms: ["HS256"],
  })
  return payload
}

export async function getSession(session: string, mustExist: boolean = true) {
  if (mustExist && !session) {
    throw new Error("session not found")
  } else {
    return session && (await decrypt(session))
  }
}
