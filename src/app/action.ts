"use server"

import { SessionResponse } from "@/pkgs/serverless-functions/types/controller/user"
import { fapi } from "@/utils/fapi"

export const createOrUpdateSession = async () => {
  try {
    return (await fapi("/user/session")).json() as Promise<SessionResponse>
  } catch (error) {
    console.log(error)
    throw error
  }
}
