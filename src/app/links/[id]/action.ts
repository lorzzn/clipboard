"use server"

import { ErrorResponse } from "@/pkgs/serverless-functions/types/controller/common"
import { UserClipboardResponse } from "@/pkgs/serverless-functions/types/controller/user"
import { sapi } from "@/utils/sapi"
import { buildQuery } from "@/utils/url"

export const getLinkedUserClipboard = async (linkedUserId: string) => {
  const q = buildQuery({
    linkedUserId,
  })
  const response = await sapi(`/user/links/clipboard?${q}`)

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
