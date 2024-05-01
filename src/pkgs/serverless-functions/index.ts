import * as userController from "./controller/user"
import routes from "./routes"

routes.add("/user/session", userController.session)

export default routes.createHandler()
