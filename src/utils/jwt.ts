import userDao from "@/dao/user"
import { UserEntity } from "@/entity/user"
import dayjs from "dayjs"
import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse, userAgent } from "next/server"

const secretKey = "a very secret key, definitely"
const key = new TextEncoder().encode(secretKey)

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

export async function getSession(mustExist: boolean = true, session = cookies().get("session")?.value) {
  if (mustExist && !session) {
    throw new Error("session not found")
  } else {
    return session && (await decrypt(session))
  }
}

export async function createSession(request: NextRequest, response: NextResponse) {
  const { ua } = userAgent(request)
  const { ip, geo } = request

  // get expires value first, then create the user
  const expires = getTokenExpireDate()
  const user = await userDao.createUser({ ua, ip, geo })

  const session = await encrypt({
    user: user.data,
    expires,
  })

  response.cookies.set("session", session, { expires, httpOnly: true })
}

export const removeSession = async (response: NextResponse) => {
  let session
  if ((session = await getSession())) {
    await userDao.deleteUserById(session.user.id)
    response.cookies.delete("session")
  }
}

export const updateSession = async (request: NextRequest, response: NextResponse) => {
  let session
  if ((session = await getSession())) {
    const { ua } = userAgent(request)
    const { ip, geo } = request

    try {
      // refresh the session expire, ua, ip and geo
      session.expires = getTokenExpireDate()
      const { data } = await userDao.updateUserById(session.user.id, { ua, ip, geo, expiresAt: session.expires })
      session.user = data

      response.cookies.set({
        name: "session",
        value: await encrypt(session),
        httpOnly: true,
        expires: session.expires,
      })
    } catch (error) {
      await createSession(request, response)
    }
  }
}
