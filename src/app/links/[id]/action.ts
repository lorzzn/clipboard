"use server"

import RuntimeError from "@/pkgs/runtime-error"
import { UserClipboardResponse } from "@/pkgs/serverless-functions/types/controller/user"
import { sapi } from "@/utils/sapi"
import { buildQuery } from "@/utils/url"

export const getLinkedUserClipboard = async (linkedUserId: string) => {
  const q = buildQuery({
    linkedUserId,
  })
  const response = await sapi(`/user/links/clipboard?${q}`)

  if (response.ok) {
    return (await response.json()) as Promise<UserClipboardResponse>
  } else {
    const error = await response.json()
    throw new RuntimeError({
      message: error.message,
      toast: true,
    })
  }
}
