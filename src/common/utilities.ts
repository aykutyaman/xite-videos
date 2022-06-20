import { Action } from "redux";

export const assertNever = (value: never): never => {
  throw new Error(`The ${value} should be unreachable`);
};

export const assertNeverWithoutThrow = (value: never): void => {
  console.log(`The ${value} should be unreachable`);
};

// TODO: impossible transitions. Discuss what to do in these cases.
// We log the case for now.
export const noTransition = <S extends { type: string }>(
  state: S,
  action: Action
): S => {
  console.error(
    `GIVEN state is ${state.type} THEN action ${action.type} should be unreachable`
  );
  return state;
};

export class InvalidJSON extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidJSON.prototype);
  }
}

export class HTTPError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

/*
  Group an array into sub-array by the number
*/
export const groupByNumber = <T>(xs: T[], n: number): T[][] =>
  new Array(Math.ceil(xs.length / n))
    .fill([])
    .map((_, i) => xs.slice(i * n, (i + 1) * n));

export const placeholder = (width: number, height: number) =>
  `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;

// intersection of two arrays
// TODO: test it considering edge cases. Time complexity O(n+m)
const intersectionOfTwo = <T>(arr1: T[], arr2: T[]): T[] => {
  const s1 = new Set(arr1);
  return arr2.reduce((acc, x) => {
    return s1.has(x) ? acc.concat(x) : acc;
  }, [] as T[]);
};

// find the intersection of 1 or more arrays.
// example: [[1,2], [2, 3], [2, 5]] returns [2]
// the array should be non empty. TODO: Handle empty array case inside?
export const intersection = <T>(list: Array<T[]>): Array<T> =>
  list.reduce(intersectionOfTwo);
