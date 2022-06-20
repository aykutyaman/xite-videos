import { describe, test } from "@jest/globals";
import { deepStrictEqual } from "assert";
import normalizer from "../normalizer";
import { validData, invalidVideos } from "../../../__tests__/sampleData";

export const sample: unknown = {
  genres: validData.genres,
  videos: [...validData.videos, ...invalidVideos], // first video is not valid
};

describe("normalizer", () => {
  test("ioErrors", () => {
    const result = normalizer(sample);
    // console.log(result.ioErrors);
    expect(result.ioErrors.length).toBe(5);
  });

  test("byId", () => {
    const result = normalizer(sample);
    deepStrictEqual(
      Object.keys(result.videos.byId).map(Number),
      validData.videos.map((v) => v.id)
    );
  });

  test("genreSelection", () => {
    const result = normalizer(sample);
    expect(result.videos.genreSelection.allGenres.length).toBe(
      validData.genres.length
    );
  });

  test("listByGenre", () => {
    const result = normalizer(sample);

    // we have all video ids saved in the listByGenre
    expect(Object.values(result.videos.listByGenre).flat().length).toBe(20);

    // TO make sure that we created an entry in the listByGenre that are not present in the
    // list that came from the server
    const union = Array.from(
      validData.videos.reduce(
        (acc, video) => acc.add(video.genre_id),
        new Set(validData.genres.map((genre) => genre.id))
      )
    ).sort();

    // all valid genres created
    deepStrictEqual(
      Object.keys(result.videos.listByGenre).map(Number).sort(),
      union
    );
  });

  test("listByYear", () => {
    const result = normalizer(sample);

    const yearsFromValid = Array.from(
      validData.videos.reduce(
        (acc, video) => acc.add(video.release_year),
        new Set()
      )
    ).sort();

    const yearsFromResult = Object.keys(result.videos.listByYear)
      .map(Number)
      .sort();

    deepStrictEqual(yearsFromValid, yearsFromResult);
  });

  test("resultList", () => {
    const result = normalizer(sample);
    expect(result.videos.resultList.length).toBe(0);
  });
});
