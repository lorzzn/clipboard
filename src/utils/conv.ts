import { toNumber, toPlainObject, toString } from "lodash"

interface Conv {
  value: any
  toString(): string
  toNumber(): number
  toBigInt(): bigint
  toBoolean(): boolean
  toSymbol(): symbol
  toUndefined(): undefined
  toObject(): object
}

class Conv {
  constructor(public value: any) {}

  toString() {
    return toString(this.value)
  }

  toNumber() {
    return toNumber(this.value)
  }

  toBigInt() {
    return BigInt(this.value)
  }

  toBoolean() {
    return Boolean(this.value)
  }

  toSymbol() {
    return Symbol(this.value)
  }

  toUndefined() {
    return undefined
  }

  toObject() {
    return toPlainObject(this.value)
  }

  to<K extends "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object">(type: K) {
    switch (type) {
      case "string":
        return this.toString()

      case "number":
        return this.toNumber()

      case "bigint":
        return this.toBigInt()

      case "boolean":
        return this.toBoolean()

      case "symbol":
        return this.toSymbol()

      case "undefined":
        return this.toUndefined()

      case "object":
        return this.toObject()

      default:
        return this.value
    }
  }
}

export function conv(value: any): Conv {
  return new Conv(value)
}
