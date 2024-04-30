import { nsfapi } from "@/utils/nsfapi"
import { procedure, router } from ".."

export const user = router({
  get: procedure.query(async ({ input, ctx }) => {
    const id = ctx.session.user.id
    const response = await nsfapi("/user")

    console.log(response)
  }),
})
