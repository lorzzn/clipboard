import { createStorage } from "unstorage"
import httpDriver from "unstorage/drivers/http"
import { getBaseUrl } from "./url"

const base = getBaseUrl() + "/api/f/redis"

const storage = createStorage({
  driver: httpDriver({ base }),
})

export default storage
