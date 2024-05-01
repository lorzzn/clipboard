import { createStorage } from "unstorage"
import redisDriver from "unstorage/drivers/redis"

const storage = createStorage({
  driver: redisDriver({
    url: "",
  }),
})

export default storage
