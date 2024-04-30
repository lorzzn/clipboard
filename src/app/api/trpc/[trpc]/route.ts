import { appRouter } from "@/trpc/server/routers/_app"
import { JWTSession, getSession } from "@/utils/jwt"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => {
      const session = (await getSession()) as JWTSession
      return {
        session,
      }
    },
  })

export { handler as GET, handler as POST }
