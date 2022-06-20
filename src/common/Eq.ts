import { Video } from "../domain";

/*
   These equality comparision are used in comparision function of useSelectors'
*/
export interface Eq<T> {
  equals: (x: T, y: T) => boolean;
}

// check if two arrays are equal
export const eqArray = <T>(E: Eq<T>): Eq<Array<T>> => ({
  // The time complexity is O(n).
  equals: (arr1, arr2) => {
    return (
      arr1.length === arr2.length && arr1.every((x, i) => E.equals(x, arr2[i]))
    );
  },
});

export const eqNumber: Eq<number> = {
  equals: (x, y) => x === y,
};

// TODO: what if we have a new Video property? Make sure that we consider all
// properties using types
export const eqVideo: Eq<Video> = {
  equals: (first, second) =>
    first.artist === second.artist &&
    first.genre_id === second.genre_id &&
    first.id === second.genre_id &&
    first.image_url === second.image_url &&
    first.release_year === second.release_year &&
    first.title === second.title,
};
