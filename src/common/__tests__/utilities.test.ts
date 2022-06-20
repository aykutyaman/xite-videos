import { describe, test } from "@jest/globals";
import { deepStrictEqual } from "assert";
import { groupByNumber, intersection } from "../utilities";

describe("utilities", () => {
  test("groupByNumber", () => {
    deepStrictEqual(groupByNumber([], 3), []);
    deepStrictEqual(groupByNumber([1], 3), [[1]]);
    deepStrictEqual(groupByNumber([1, 2, 3, 4], 3), [[1, 2, 3], [4]]);
    deepStrictEqual(groupByNumber([1, 2, 3], 3), [[1, 2, 3]]);
  });

  test("intersection", () => {
    deepStrictEqual(
      intersection([
        [1, 2, 3],
        [2, 3],
        [3, 4, 5],
      ]),
      [3]
    );
  });

  test("intersection of only one array is equal to itself", () => {
    deepStrictEqual(intersection([[1, 2, 3]]), [1, 2, 3]);
  });

  test("intersection of only one array with an empty are is empty", () => {
    deepStrictEqual(intersection([[1, 2, 3], []]), []);
  });

  test("intersection of two empty arrays is empty", () => {
    deepStrictEqual(intersection([[], []]), []);
  });

  test("intersection of one empty arrays is empty", () => {
    deepStrictEqual(intersection([[]]), []);
  });

  test("intersection throws an error with an empty array", () => {
    expect(() => intersection([])).toThrow(
      "Reduce of empty array with no initial value"
    );
  });
});
