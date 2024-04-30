import { NextRequest, NextResponse } from "next/server"
import { createSession, getSession, updateSession } from "@/pkgs/jwt"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const session = await getSession()

  if (!session) {
    await createSession(request, response)
  } else {
    await updateSession(request, response)
  }

  const { pathname } = request.nextUrl
  response.headers.set("x-pathname", pathname)

  return response
}
