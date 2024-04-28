import Clipboard, { ClipboardEntity, ClipboardEntityConfig } from "@/entity/clipboard"
import storage from "@/utils/storage"
import { randomString } from "@/utils/string"
import { random, toNumber } from "lodash"

class ClipboardDao {
  async generateClipboardId(): Promise<number> {
    const sub = randomString(5, "", "1234567890")
    const start = random(1, 9)
    const id = start.toString() + sub
    const clipboard = await this.getClipboardById(id, false)

    // if the id is taken, generate a new one
    if (clipboard) {
      return this.generateClipboardId()
    }
    return toNumber(id)
  }

  async getClipboardById<K extends boolean = true>(
    id: number | string,
    mustExist: K = true as K,
  ): Promise<K extends true ? Clipboard : Clipboard | null> {
    const clipboard = new Clipboard({ id })
    const data = await storage.getItem<ClipboardEntity>(clipboard.key)

    if (mustExist && !data) {
      throw new Error("Clipboard not found")
    }

    return data ? new Clipboard(data) : (null as any)
  }

  async createClipboard(config: Omit<ClipboardEntityConfig, "id"> = {}): Promise<Clipboard> {
    const clipboard = new Clipboard({
      ...config,
      id: await this.generateClipboardId(),
    })
    await storage.setItem(clipboard.key, clipboard.data)

    return clipboard
  }

  async updateClipboardById(id: number | string, clipboard: ClipboardEntityConfig): Promise<Clipboard> {
    const target = await this.getClipboardById(id)
    target.update(clipboard)
    await storage.setItem(target.key, target.data)

    return target
  }

  async deleteClipboardById(id: number | string): Promise<void> {
    const clipboard = new Clipboard({ id })
    await storage.removeItem(clipboard.key)
  }
}

const clipboardDao = new ClipboardDao()

export default clipboardDao
