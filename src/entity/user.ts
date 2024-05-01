import { withKeyPrefix } from "@/utils/key"
import { mapStruct } from "@/utils/struct"
import { UserEntity } from "./types/user"

export type UserEntityConfig = {
  [K in keyof UserEntity]?: any
}

class User {
  data: UserEntity = {
    id: 0,
    clipboardId: 0,
    ip: "",
    ua: "",
    geo: {},
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
}

export default User
