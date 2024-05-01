"use server"

import { set } from "lodash"
import { getBaseUrl } from "./url"
import { cookies } from "next/headers";

const baseUrl = getBaseUrl() + "/api/f"

export const fapi = async (url: string, options?: RequestInit) => {
  try {
    if (!options) {
      options = {}
    }
    // add cookies to request headers
    set(options, "headers.cookie", cookies().toString())
    url = baseUrl + url
    const request = new Request(url, options)
    const fetchStartTime = performance.now()
    const response = await fetch(request)

    console.log(
      "",
      request.method,
      "fapi",
      response.url,
      response.status,
      "in",
      ((performance.now() - fetchStartTime) | 0) + "ms",
    )

    return response as Response
  } catch (error) {
    console.error("Failed to fetch data from serverless functions")
    throw error
  }
}
