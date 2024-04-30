import routes from "./routes"

routes.add("/xxx", (_, response) => {
  response.send(111111)
})

export default routes.createHandler()
