import { withKeyPrefix } from "@/utils/key"
import { mapStruct } from "@/utils/struct"
import { assign, map, toArray, toNumber, toString } from "lodash"

export type ClipboardEntity = {
  id: number
  data: string[]
}

export type ClipboardEntityConfig = {
  [K in keyof ClipboardEntity]?: any
}

class Clipboard {
  data: ClipboardEntity = {
    id: 0,
    data: [],
  }

  constructor(config: ClipboardEntityConfig = {}) {
    this.update(config)
  }

  update(config: ClipboardEntityConfig) {
    mapStruct(this.data, config)
  }

  get key() {
    return withKeyPrefix("clipboard", this.data.id)
  }
}

export default Clipboard
