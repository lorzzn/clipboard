"use server"
import { fapi } from "@/utils/fapi"

export const createOrUpdateSession = async () => {
  try {
    const res = await fapi("/user/session")
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}
