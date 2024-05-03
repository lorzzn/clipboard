"use server"

import { ErrorResponse } from "@/pkgs/serverless-functions/types/controller/common"
import { sapi } from "@/utils/sapi"
import { buildQuery } from "@/utils/url"

export const getLinks = async () => {
  const response = await sapi("/user/links")

  if (response.ok) {
    return {
      ok: response.ok,
      data: await response.json(),
    }
  } else {
    return {
      ok: response.ok,
      data: (await response.json()) as ErrorResponse,
    }
  }
}

export const createLink = async (linkedUserId: number | string) => {
  const q = buildQuery({
    linkedUserId,
  })
  const response = await sapi(`/user/links/create?${q}`)

  if (response.ok) {
    return {
      ok: response.ok,
      data: await response.json(),
    }
  } else {
    return {
      ok: response.ok,
      data: (await response.json()) as ErrorResponse,
    }
  }
}

export const deleteLink = async (linkedUserId: number | string) => {
  const q = buildQuery({
    linkedUserId,
  })

  const response = await sapi(`/user/links/delete?${q}`)

  if (response.ok) {
    return {
      ok: response.ok,
      data: await response.json(),
    }
  } else {
    return {
      ok: response.ok,
      data: (await response.json()) as ErrorResponse,
    }
  }
}
