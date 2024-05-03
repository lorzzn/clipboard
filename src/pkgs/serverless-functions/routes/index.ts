import { VercelRequest, VercelResponse } from "@vercel/node"
import { toString } from "lodash"
import RuntimeError from "../../runtime-error"
import { HandlerFunction } from "../types"
import { ErrorResponse } from "../types/controller/common"

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
    return async (request: VercelRequest, response: VercelResponse) => {
      for (const routePath of Array.from(this.routes.keys())) {
        const regex = new RegExp(routePath)
        if (regex.test(toString(request.url))) {
          try {
            await this.routes.get(routePath)?.(request, response)
          } catch (error) {
            if (error instanceof RuntimeError) {
              response.status(500).json({
                message: error.message || "Server error",
                toast: error.toast,
              } as ErrorResponse)
            }
          }
          console.log("serverless-functions:", request.url, "->", routePath)
          return
        }
      }
      response.status(404).send("Not found")
    }
  }
}

const routes = new Routes({ baseUrl: "/api/f" })

export default routes
