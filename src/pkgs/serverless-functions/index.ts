import * as userController from "./controller/user"
import routes from "./routes"

routes.add("/user/session", userController.getSession)

routes.add("/user/clipboard/action", userController.userClipboardAction)
routes.add("/user/clipboard", userController.getClipboard)

routes.add("/user/links/create", userController.createLink)
routes.add("/user/links/delete", userController.deleteLink)
routes.add("/user/links", userController.getLinkList)

export default routes.createHandler()
