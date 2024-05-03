"use server"

import { UserClipboardActionType } from "@/pkgs/serverless-functions/service/userClipboard"
import { ErrorResponse } from "@/pkgs/serverless-functions/types/controller/common"
import { SessionResponse, UserClipboardResponse } from "@/pkgs/serverless-functions/types/controller/user"
import { sapi } from "@/utils/sapi"
import { buildQuery } from "@/utils/url"
import { toString } from "lodash"

export const getSession = async () => {
  const response = await sapi("/user/session")

  if (response.ok) {
    return {
      ok: response.ok,
      data: (await response.json()) as SessionResponse,
    }
  } else {
    return {
      ok: response.ok,
      data: (await response.json()) as ErrorResponse,
    }
  }
}

export const getUserClipboard = async () => {
  const response = await sapi(`/user/clipboard`)

  if (response.ok) {
    return {
      ok: response.ok,
      data: (await response.json()) as UserClipboardResponse,
    }
  } else {
    return {
      ok: response.ok,
      data: (await response.json()) as ErrorResponse,
    }
  }
}

export const userClipboardAction = async (type: UserClipboardActionType, value: string | number) => {
  const b64 = Buffer.from(toString(value), "utf-8").toString("base64")
  const q = buildQuery({
    type,
    data: b64,
  })
  const response = await sapi(`/user/clipboard/action?${q}`)

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

export const deleteUser = async () => {
  const response = await sapi("/user/delete")

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
