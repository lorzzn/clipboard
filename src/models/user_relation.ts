import { assign } from "lodash"

export type UserRelationData = {
  userId?: number
  relatedUserId?: number
}

class UserRelation {
  data: Required<UserRelationData> = {
    userId: 0,
    relatedUserId: 0,
  }

  constructor(data: UserRelationData = {}) {
    assign(this.data, data)
  }
}

export default UserRelation
