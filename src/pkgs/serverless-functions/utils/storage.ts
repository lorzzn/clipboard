import { createStorage } from "unstorage"
import redisDriver from "unstorage/drivers/redis"

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379"
const storage = createStorage({
  driver: redisDriver({
    url: redisUrl,
  }),
})

export default storage
