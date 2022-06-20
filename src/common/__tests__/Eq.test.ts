import { describe, test } from "@jest/globals";
import { eqNumber, eqArray } from "../Eq";

describe("Eq", () => {
  test("eqNumber", () => {
    expect(eqNumber.equals(1, 2)).toBe(false);
    expect(eqNumber.equals(1, 1)).toBe(true);
    expect(eqNumber.equals(-1, 1)).toBe(false);
    expect(eqNumber.equals(-1, -1)).toBe(true);
  });

  test("eqArray", () => {
    expect(eqArray(eqNumber).equals([], [])).toBe(true);
    expect(eqArray(eqNumber).equals([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(eqArray(eqNumber).equals([1, 2], [1, 2, 3])).toBe(false);
  });

  test("eqArray - unsorted arrays are not equal", () => {
    const arr1 = [1, 2];
    const arr2 = [2, 1];
    expect(eqArray(eqNumber).equals(arr1, arr2)).toBe(false);
  });
});
