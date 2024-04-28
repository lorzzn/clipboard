import { createStorage } from "unstorage"
import memoryDriver from "unstorage/drivers/memory"

const storage = createStorage({
  driver: memoryDriver(),
})

export default storage
