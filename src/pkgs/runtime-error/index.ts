export type RuntimeErrorConfig = {
  message?: string
  toast?: boolean
}

class RuntimeError extends Error {
  toast: boolean = false

  constructor(config: RuntimeErrorConfig = {}) {
    super(config.message || "Runtime Error")
    this.name = "RuntimeError"
    this.toast = config.toast || false
  }
}

export default RuntimeError
