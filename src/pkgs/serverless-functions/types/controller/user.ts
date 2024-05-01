import { UserEntity } from "@/entity/types/user"

export type SessionResponse = {
  user:
    | UserEntity
    | {
        expiresAt: string
      }
  session: string
}
