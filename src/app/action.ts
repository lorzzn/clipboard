"use server"

import { SessionResponse } from "@/pkgs/serverless-functions/types/controller/user"
import { sapi } from "@/utils/sapi"

export const session = async () => {
  try {
    return (await sapi("/user/session")).json() as Promise<SessionResponse>
  } catch (error) {
    console.log(error)
    throw error
  }
}
