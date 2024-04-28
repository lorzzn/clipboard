import { has } from "lodash"
import { conv } from "./conv"

type Struct = {
  [key: string]: any
}

export function mapStruct(target: Struct, struct: Struct) {
  for (const key in struct) {
    if (has(target, key)) {
      const type = typeof target[key]
      if (type !== "function") {
        target[key] = conv(struct[key]).to(type)
      }
    }
  }
}
