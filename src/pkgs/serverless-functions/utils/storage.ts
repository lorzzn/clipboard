import { createStorage } from "unstorage"
import redisDriver from "unstorage/drivers/redis"

const storage = createStorage({
  driver: redisDriver({
    url: "redis://127.0.0.1:6379",
  }),
})

export default storage
