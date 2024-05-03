import { UseToastOptions } from "@chakra-ui/react"

export type RuntimeErrorConfig = {
  message?: string
  toast?: UseToastOptions
}

class RuntimeError extends Error {
  toast: UseToastOptions = {}

  constructor(config: RuntimeErrorConfig = {}) {
    super(config.message || "Runtime Error")
    this.name = "RuntimeError"
    this.toast = { ...config.toast }
  }
}

export default RuntimeError
