import routes from "./routes"
import { getSession } from "./utils/jwt";
import storage from "./utils/storage"

routes.add("/xxx", async (request, response) => {
  console.log(request.cookies)

  console.log(await getSession(request.cookies.session));

  storage.setItem("test", "123")
  const res = await storage.getItem("test")
  response.json({
    res,
  })
})

export default routes.createHandler()
