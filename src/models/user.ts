import { encrypt } from "@/utils/jwt"
import { withKeyPrefix } from "@/utils/kvFuncs"
import { assign } from "lodash"
import { cookies } from "next/headers"

type Base = {
  id?: number
  clipboardId?: number
}

export type UserData =
  | Base
  | {
      id?: string
      clipboardId?: string
    }

class User {
  data: Required<Base> = {
    id: 0,
    clipboardId: 0,
  }


  constructor(data: UserData = {}) {
    assign(this.data, data)
  }

  get keyOfId() {
    return withKeyPrefix("id:") + this.data.id
  }

}

export default User
