import { random, toNumber } from "lodash"
import RuntimeError from "../../runtime-error"
import { tokenDuration } from "../utils/jwt"
import storage from "../utils/storage"
import Clipboard, { ClipboardEntity } from "./../../../entity/clipboard"
import { randomString } from "./../../../utils/string"

const generateClipboardId = async (): Promise<number> => {
  const sub = randomString(5, "", "1234567890")
  const start = random(1, 9)
  const id = start.toString() + sub
  const clipboard = new Clipboard({ id })
  const exist = await storage.hasItem(clipboard.key)

  // if the id is taken, generate a new one
  if (exist) {
    return generateClipboardId()
  }
  return toNumber(id)
}

export const create = async (): Promise<Clipboard> => {
  const clipboard = new Clipboard({
    id: await generateClipboardId(),
  })

  await storage.setItem(clipboard.key, clipboard.data, {
    ttl: tokenDuration,
  })

  return clipboard
}

export const refreshTTL = async (id: number) => {
  const clipboard = new Clipboard({ id })
  const data = await storage.getItem(clipboard.key)

  if (!data) {
    throw new RuntimeError({
      message: "Clipboard not found",
    })
  }

  await storage.setItem(clipboard.key, data, {
    ttl: tokenDuration,
  })
}

export const getClipboard = async (id: number): Promise<ClipboardEntity> => {
  const clipboard = new Clipboard({ id })
  const data = await storage.getItem<ClipboardEntity>(clipboard.key)

  if (!data) {
    throw new RuntimeError({
      message: "Clipboard not found",
    })
  }
  clipboard.update(data)

  return clipboard.data
}
