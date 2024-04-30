import { JWTSession, getSession } from "@/utils/jwt"
import { createCallerFactory, router } from ".."
import { user } from "./user"

export const appRouter = router({
  user
})

export type AppRouter = typeof appRouter

const createCaller = createCallerFactory(appRouter)
export const caller = createCaller(async () => {
  return {
    session: (await getSession()) as JWTSession,
  }
})
