import { isArray } from "lodash"

export const keyPrefix = "clipboard-next:"

export const withKeyPrefix = (key: string | string[]) => {
  if (isArray(key)) {
    return keyPrefix + key.join(":")
  }

  return keyPrefix + key
}
