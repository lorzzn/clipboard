import { toString } from "lodash"
import { withKeyPrefix } from "../utils/key"
import { mapStruct } from "../utils/struct"

export type UserLinkEntity = {
  userId?: number
  linkedUserId?: number | string
  status: 0 | 1
}

export type UserLinkEntityConfig = {
  [K in keyof UserLinkEntity]?: any
}

class UserLink {
  data: Required<UserLinkEntity> = {
    userId: 0,
    linkedUserId: 0,
    status: 0,
  }

  constructor(config: UserLinkEntityConfig = {}) {
    this.update(config)
  }

  update(config: UserLinkEntityConfig) {
    mapStruct(this.data, config)
  }

  static validateLinkedUserId(value: string | number) {
    return toString(value).length === 6
  }

  get baseKey() {
    return withKeyPrefix("user", this.data.userId, "links")
  }

  get key() {
    return withKeyPrefix("user", this.data.userId, "links", this.data.linkedUserId)
  }

  static getUserIdfromKey(key: string) {
    const [, , userId, , linkedUserId] = key.split(":")
    return {
      userId: Number(userId),
      linkedUserId: Number(linkedUserId),
    }
  }
}

export default UserLink
