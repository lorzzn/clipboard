"use server"

import { ClipboardEntity } from "@/entity/clipboard"
import { SessionResponse } from "@/pkgs/serverless-functions/types/controller/user"
import { sapi } from "@/utils/sapi"

export const getSession = async () => (await sapi("/session")).json() as Promise<SessionResponse>

export const getClipboard = async () => (await sapi(`/clipboard`)).json() as Promise<ClipboardEntity>
