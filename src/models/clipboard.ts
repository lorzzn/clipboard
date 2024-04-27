import { assign } from "lodash"

export type ClipboardData = {
  id?: number
  userId?: number
  contentList?: string[]
}

class Clipboard {
  data: Required<ClipboardData> = {
    id: 0,
    userId: 0,
    contentList: [],
  }

  constructor(data: ClipboardData = {}) {
    assign(this.data, data)
  }
}

export default Clipboard
