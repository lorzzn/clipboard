import User, { UserEntity, UserEntityConfig } from "@/entity/user"
import { getTokenExpireDate } from "@/utils/jwt"
import storage from "@/utils/storage"
import { randomString } from "@/utils/string"
import dayjs from "dayjs"
import { random, toNumber } from "lodash"
import clipboardDao from "./clipboard"

class UserDao {
  async generateUserId(): Promise<number> {
    const sub = randomString(5, "", "1234567890")
    const start = random(1, 9)
    const id = start.toString() + sub
    const user = await this.getUserById(id, false)

    // if the id is taken, generate a new one
    if (user) {
      return this.generateUserId()
    }
    return toNumber(id)
  }

  async getUserById<K extends boolean = true>(
    id: number | string,
    mustExist: K = true as K,
  ): Promise<K extends true ? User : User | null> {
    const user = new User({ id })
    const _data = await storage.getItem<UserEntity>(user.key)
    const isExpired = dayjs(_data?.expiresAt).isBefore(dayjs())
    const data = isExpired ? null : _data

    if (mustExist && !data) {
      if (isExpired && _data) {
        this.deleteUserById(_data.id)
        clipboardDao.deleteClipboardById(_data.clipboardId)
        throw new Error("Session expired")
      }
      throw new Error("User not found")
    }

    return data ? new User(data) : (null as any)
  }

  async createUser(config: Omit<UserEntityConfig, "id" | "clipboardId">): Promise<User> {
    const clipboard = await clipboardDao.createClipboard()
    const user = new User({
      ...config,
      id: await this.generateUserId(),
      clipboardId: clipboard.data.id,
      expiresAt: getTokenExpireDate(),
    })
    await storage.setItem(user.key, user.data)

    return user
  }

  async updateUserById(id: number | string, user: UserEntityConfig): Promise<User> {
    const target = await this.getUserById(id)
    target.update(user)
    await storage.setItem(target.key, target.data)

    return target
  }

  async deleteUserById(id: number | string): Promise<void> {
    const user = new User({ id })
    await storage.removeItem(user.key)
  }
}

const userDao = new UserDao()

export default userDao
