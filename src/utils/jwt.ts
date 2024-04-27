import dayjs from "dayjs"
import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = "a very secret key, definitely"
const key = new TextEncoder().encode(secretKey)

type Session = {
  user: {
    id: number
    clipboardId: number
  }
  expires: Date
} & JWTPayload

export async function encrypt(payload: Session) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expires)
    .sign(key)
}

export async function decrypt(input: string): Promise<Session> {
  const { payload } = await jwtVerify<Session>(input, key, {
    algorithms: ["HS256"],
  })
  return payload
}

export async function getSession() {
  const session = cookies().get("session")?.value
  if (!session) return null
  return await decrypt(session)
}
