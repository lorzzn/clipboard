"use server"

import { UserLinkResponse } from "@/pkgs/serverless-functions/types/controller/user"
import { sapi } from "@/utils/sapi"
import { buildQuery } from "@/utils/url"

export const getLinks = async () => (await sapi("/user/links")).json() as Promise<UserLinkResponse[]>

export const createLink = async (linkedUserId: number | string) => {
  const q = buildQuery({
    linkedUserId,
  })
  return (await sapi(`/user/links/create?${q}`)).json()
}

export const deleteLink = async (linkedUserId: number | string) => {
  const q = buildQuery({
    linkedUserId,
  })

  return (await sapi(`/user/links/delete?${q}`)).json()
}
