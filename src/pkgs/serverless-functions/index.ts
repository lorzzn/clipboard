import { creaetOrUpdateSession } from "./controller/user"
import routes from "./routes"

routes.add("/user/session", creaetOrUpdateSession)

export default routes.createHandler()
