"use server"

import { UserClipboardEntity } from "@/entity/userClipboard"
import { UserClipboardActionType } from "@/pkgs/serverless-functions/service/userClipboard"
import { SessionResponse } from "@/pkgs/serverless-functions/types/controller/user"
import { sapi } from "@/utils/sapi"
import { buildQuery } from "@/utils/url"
import { toString } from "lodash"

export const getSession = async () => (await sapi("/user/session")).json() as Promise<SessionResponse>

export const getClipboard = async () => (await sapi(`/user/clipboard`)).json() as Promise<UserClipboardEntity>

export const userClipboardAction = async (type: UserClipboardActionType, value: string | number) => {
  const b64 = Buffer.from(toString(value), "utf-8").toString("base64")
  const q = buildQuery({
    type,
    data: b64,
  })
  return (await sapi(`/user/clipboard/action?${q}`)).json()
}
