import { withKeyPrefix } from "../utils/key"
import { mapStruct } from "../utils/struct"

export type UserClipboardEntity = {
  userId: number
  data: string[]
}

export type UserClipboardEntityConfig = {
  [K in keyof UserClipboardEntity]?: any
}

class UserClipboard {
  data: UserClipboardEntity = {
    userId: 0,
    data: [],
  }

  constructor(config: UserClipboardEntityConfig = {}) {
    this.update(config)
  }

  update(config: UserClipboardEntityConfig) {
    mapStruct(this.data, config)
  }

  get key() {
    return withKeyPrefix("user", this.data.userId, "clipboard")
  }
}

export default UserClipboard
