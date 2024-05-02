import { mapStruct } from "@/utils/struct"
import { withKeyPrefix } from "../utils/key"

export type UserLinkEntity = {
  userId?: number
  linkedUserId?: number
}

export type UserLinkEntityConfig = {
  [K in keyof UserLinkEntity]?: any
}

class UserLink {
  data: Required<UserLinkEntity> = {
    userId: 0,
    linkedUserId: 0,
  }

  constructor(config: UserLinkEntityConfig = {}) {
    this.update(config)
  }

  update(config: UserLinkEntityConfig) {
    mapStruct(this.data, config)
  }

  get key() {
    return withKeyPrefix("user", this.data.userId, "links", this.data.linkedUserId)
  }
}

export default UserLink
