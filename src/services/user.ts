import User from "@/models/user"
import { decrypt, encrypt } from "@/utils/jwt"
import { generateUniqueId } from "@/utils/shared"
import dayjs from "dayjs"
import { NextRequest, NextResponse } from "next/server"

export const tokenExpireDuration = () => dayjs().add(3, "minute").toDate()

export const login = async (request: NextRequest, response: NextResponse) => {
  const user = new User({
    id: await generateUniqueId("user"),
    clipboardId: await generateUniqueId("clipboard"),
  })

  const expires = tokenExpireDuration()
  const session = await encrypt({
    user: user.data,
    expires,
  })

  response.cookies.set("session", session, { expires, httpOnly: true })
}

export const logout = async (request: NextRequest, response: NextResponse) => {
  response.cookies.delete("session")
}

export const refreshSession = async (request: NextRequest, response: NextResponse) => {
  const session = request.cookies.get("session")?.value
  if (!session) return

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session)
  parsed.expires = tokenExpireDuration()

  response.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  })
}
