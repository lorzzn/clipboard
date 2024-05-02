import { withKeyPrefix } from "./../utils/key"
import { mapStruct } from "./../utils/struct"
import { UserEntity } from "./types/user"
import UserClipboard from "./userClipboard"

export type UserEntityConfig = {
  [K in keyof UserEntity]?: any
}

class User {
  data: UserEntity = {
    id: 0,
    ip: "",
    ua: "",
    expiresAt: new Date(0),
  }

  constructor(config: UserEntityConfig = {}) {
    this.update(config)
  }

  update(config: UserEntityConfig) {
    mapStruct(this.data, config)
  }

  get key() {
    return withKeyPrefix("user", this.data.id)
  }

  get clipboardKey() {
    return new UserClipboard({ userId: this.data.id }).key
  }
}

export default User
