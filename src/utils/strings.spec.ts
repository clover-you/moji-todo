import { describe, test, expect } from "vitest"
import { has } from "./strings"

describe("string utils", () => {
  test("should return false when checked empty string", () => {
    expect(has("")).toBeFalsy()
    expect(has(" ")).toBeFalsy()
    expect(has()).toBeFalsy()
    expect(has(null as unknown as undefined)).toBeFalsy()
  })

  test("should return true when the string is not empty", () => {
    expect(has("hello world")).toBeTruthy()
  })
})
