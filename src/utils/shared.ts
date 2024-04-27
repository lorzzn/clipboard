import { kv } from "@vercel/kv"
import { random, toNumber } from "lodash"
import { withKeyPrefix } from "./kvFuncs"
import { randomString } from "./stringFuncs"

export async function generateUniqueId(model: "user" | "clipboard") {
  const sub = randomString(5, "", "1234567890")
  const start = random(1, 9)
  const id = start.toString() + sub
  const key = withKeyPrefix(model) + ":" + id

  const exist = await kv.exists(key)
  if (exist) {
    return generateUniqueId(model)
  }
  return toNumber(id)
}
