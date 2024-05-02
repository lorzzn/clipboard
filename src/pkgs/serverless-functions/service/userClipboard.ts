import { toNumber } from "lodash"
import UserClipboard, { UserClipboardEntity } from "../../../entity/userClipboard"
import RuntimeError from "../../runtime-error"
import storage from "../utils/storage"

export type UserClipboardActionType = "add" | "delete" | "reset"

export const create = async (userId: number): Promise<UserClipboard> => {
  const clipboard = new UserClipboard({ userId })

  await storage.setItem(clipboard.key, clipboard.data)

  return clipboard
}

export const getClipboard = async (userId: number): Promise<UserClipboard> => {
  const clipboard = new UserClipboard({ userId })
  const data = await storage.getItem<UserClipboardEntity>(clipboard.key)

  if (!data) {
    throw new RuntimeError({
      message: "Clipboard not found",
    })
  }
  clipboard.update(data)

  return clipboard
}

export const action = async (
  userId: number,
  type: UserClipboardActionType,
  value: string,
): Promise<UserClipboardEntity> => {
  const clipboard = new UserClipboard({ userId })
  const target = await storage.getItem<UserClipboardEntity>(clipboard.key)

  if (!target) {
    throw new RuntimeError({
      message: "Clipboard not found",
    })
  }
  clipboard.update(target)
  let clipboardData = clipboard.data.data

  switch (type) {
    case "add":
      clipboardData.push(value)
      break

    case "delete":
      clipboardData.splice(toNumber(value), 1)
      break

    case "reset":
      clipboardData = []
      break
  }

  clipboard.update({ data: clipboardData })
  await storage.setItem(clipboard.key, clipboard.data)

  return clipboard.data
}
