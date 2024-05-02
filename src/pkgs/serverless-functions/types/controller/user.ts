import { UserEntity } from "@/entity/types/user"
import { UserClipboardEntity } from "@/entity/userClipboard"
import { UserLinkEntity } from "@/entity/userLink"

export interface UserData extends Omit<UserEntity, "expiresAt"> {
  expiresAt: string | Date
}

export type SessionResponse = {
  user: UserData
  session: string
}

export type UserClipboardResponse = UserClipboardEntity

export type UserLinkResponse = UserLinkEntity
