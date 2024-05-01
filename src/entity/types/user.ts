import { RequestData } from "next/dist/server/web/types"

export type UserEntity = {
  id: number
  clipboardId: number
  ip: string
  ua: string
  geo: RequestData["geo"]
  expiresAt: Date
}
