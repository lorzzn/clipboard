"use server"

import { ClipboardEntity } from "@/entity/clipboard"
import { clipboardActionType } from "@/pkgs/serverless-functions/service/clipboard"
import { SessionResponse } from "@/pkgs/serverless-functions/types/controller/user"
import { sapi } from "@/utils/sapi"
import { buildQuery } from "@/utils/url"
import { toString } from "lodash"

export const getSession = async () => (await sapi("/session")).json() as Promise<SessionResponse>

export const getClipboard = async () => (await sapi(`/clipboard`)).json() as Promise<ClipboardEntity>

export const clipboardAction = async (type: clipboardActionType, value: string | number) => {
  const b64 = Buffer.from(toString(value), "utf-8").toString("base64")
  const q = buildQuery({
    type,
    data: b64,
  })
  return (await sapi(`/clipboard/action?${q}`)).json()
}
