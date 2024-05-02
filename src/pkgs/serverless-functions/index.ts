import * as userController from "./controller/user"
import routes from "./routes"

routes.add("/session", userController.getSession)
routes.add("/clipboard/action", userController.userClipboardAction)
routes.add("/clipboard", userController.getClipboard)

export default routes.createHandler()
