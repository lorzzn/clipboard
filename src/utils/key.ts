export const keyPrefix = "clipboard-next"

export const withKeyPrefix = (...args: (string | number)[]) => {
  return [keyPrefix, ...args].join(":")
}
