import chalk from "chalk"
import { set, toString } from "lodash"
import { getBaseUrl } from "./url"

const baseUrl = getBaseUrl() + "/api/nsf"

export const nsfapi = async (url: string, cookies?: string, options?: RequestInit) => {
  try {
    if (!options) {
      options = {}
    }
    set(options, "headers.cookie", toString(cookies))
    url = baseUrl + url
    const request = new Request(url, options)
    const fetchStartTime = performance.now()
    const response = await fetch(request)

    console.log(
      "",
      request.method,
      chalk.bgGreen.white("nsfapi"),
      response.url,
      (response.ok ? chalk.green : chalk.red)(response.status),
      "in",
      chalk.white((performance.now() - fetchStartTime) | 0) + "ms",
    )

    return response
  } catch (error) {
    console.error("Failed to fetch data from serverless functions")
    throw error
  }
}
