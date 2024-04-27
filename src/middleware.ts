import { NextRequest, NextResponse } from "next/server"
import { login, refreshSession } from "./services/user"
import { getSession } from "./utils/jwt"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const session = await getSession()

  console.log(session);

  if (!session) {
    await login(request, response)
  } else {
    await refreshSession(request, response)
  }

  const { pathname } = request.nextUrl
  response.headers.set("x-pathname", pathname)

  return response
}
