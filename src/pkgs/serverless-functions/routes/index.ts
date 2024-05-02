import { VercelRequest, VercelResponse } from "@vercel/node"
import { toString } from "lodash"
import { HandlerFunction } from "../types"

export type RoutesConfig = {
  baseUrl?: string
}

class Routes {
  baseUrl: string = ""
  routes: Map<string, HandlerFunction> = new Map()

  constructor(config: RoutesConfig = {}) {
    this.baseUrl = toString(config.baseUrl)
  }

  private r(path: string) {
    return this.baseUrl + path
  }

  add(path: string, func: HandlerFunction) {
    this.routes.set(this.r(path), func)
  }

  createHandler() {
    return (request: VercelRequest, response: VercelResponse) => {
      for (const routePath of Array.from(this.routes.keys())) {
        const regex = new RegExp(routePath)
        if (regex.test(toString(request.url))) {
          this.routes.get(routePath)?.(request, response)
          console.log("serverless-functions:", request.url, "->", routePath);
          return
        }
      }
      response.status(404).send("Not found")
    }
  }
}

const routes = new Routes({ baseUrl: "/api/f" })

export default routes
