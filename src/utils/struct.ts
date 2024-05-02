import { has } from "lodash"

type Struct = {
  [key: string]: any
}

export function mapStruct(target: Struct, struct: Struct) {
  for (const key in struct) {
    if (has(target, key)) {
      const constructor = Object.getPrototypeOf(target[key]).constructor
      if (constructor) {
        if (constructor.from) {
          target[key] = constructor.from(struct[key])
        } else {
          target[key] = new constructor(struct[key])
        }
      }
    }
  }
}
