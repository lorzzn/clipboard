import { UserEntity } from "@/entity/types/user"

interface UserData extends Omit<UserEntity, "expiresAt"> {
  expiresAt: string | Date
}

export type SessionResponse = {
  user: UserData
  session: string
}
