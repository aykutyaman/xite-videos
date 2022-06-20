import { describe, test } from "@jest/globals";
import { deepStrictEqual } from "assert";
import { Video, Videos } from "../../../domain";
import resultList from "../resultList";

describe("resultList", () => {
  test("yearSelection-search-genreSelection selected", () => {
    const state: Videos = {
      type: "Videos",
      byId: {},
      listByYear: {
        2000: [4, 5, 10, 11],
        2001: [12],
      },
      listByGenre: {
        1000: [1, 8],
        1001: [4, 5],
        1002: [20],
      },
      genreSelection: {
        type: "GenreActive",
        allGenres: [
          { id: 1000, name: "Pop" },
          { id: 1001, name: "Rock" },
          { id: 1002, name: "Country" },
        ],
        selectedGenres: [1000, 1001],
      },
      yearSelection: {
        type: "YearActive",
        year: 2000,
      },
      search: {
        type: "SearchActive",
        result: [5, 7, 8, 10],
      },
      resultList: [],
    };
    deepStrictEqual(resultList(state).resultList, [5]);
  });

  test("with only yearSelection active", () => {
    const state: Videos = {
      type: "Videos",
      byId: {},
      listByYear: {
        2000: [4, 5, 10, 11],
        2001: [12],
      },
      listByGenre: {
        1000: [1, 8],
        1001: [4, 5],
        1002: [20],
      },
      genreSelection: {
        type: "GenrePassive",
        allGenres: [
          { id: 1000, name: "Pop" },
          { id: 1001, name: "Rock" },
          { id: 1002, name: "Country" },
        ],
      },
      yearSelection: {
        type: "YearActive",
        year: 2000,
      },
      search: {
        type: "SearchPassive",
      },
      resultList: [],
    };
    deepStrictEqual(resultList(state).resultList, [4, 5, 10, 11]);
  });

  test("with only search active", () => {
    const state: Videos = {
      type: "Videos",
      byId: {},
      listByYear: {
        2000: [4, 5, 10, 11],
        2001: [12],
      },
      listByGenre: {
        1000: [1, 8],
        1001: [4, 5],
        1002: [20],
      },
      genreSelection: {
        type: "GenrePassive",
        allGenres: [
          { id: 1000, name: "Pop" },
          { id: 1001, name: "Rock" },
          { id: 1002, name: "Country" },
        ],
      },
      yearSelection: {
        type: "YearPassive",
      },
      search: {
        type: "SearchActive",
        result: [4, 5],
      },
      resultList: [],
    };
    resultList(state);
    deepStrictEqual(resultList(state).resultList, [4, 5]);
  });

  test("with only genreSelection active", () => {
    const state: Videos = {
      type: "Videos",
      byId: {},
      listByYear: {
        2000: [4, 5, 10, 11],
        2001: [12],
      },
      listByGenre: {
        1000: [1, 8],
        1001: [4, 5],
        1002: [20],
      },
      genreSelection: {
        type: "GenreActive",
        allGenres: [
          { id: 1000, name: "Pop" },
          { id: 1001, name: "Rock" },
          { id: 1002, name: "Country" },
        ],
        selectedGenres: [1000, 1001],
      },
      yearSelection: {
        type: "YearPassive",
      },
      search: {
        type: "SearchPassive",
      },
      resultList: [],
    };
    resultList(state);
    deepStrictEqual(resultList(state).resultList, [1, 8, 4, 5]);
  });

  test("with no selection finds ids from byId", () => {
    const given: Videos = {
      type: "Videos",
      byId: {
        4: {} as Video,
        5: {} as Video,
      },
      listByYear: {
        2000: [4, 5, 10, 11],
        2001: [12],
      },
      listByGenre: {
        1000: [1, 8],
        1001: [4, 5],
        1002: [20],
      },
      genreSelection: {
        type: "GenrePassive",
        allGenres: [
          { id: 1000, name: "Pop" },
          { id: 1001, name: "Rock" },
          { id: 1002, name: "Country" },
        ],
      },
      yearSelection: {
        type: "YearPassive",
      },
      search: {
        type: "SearchPassive",
      },
      resultList: [],
    };
    const expected = resultList(given);
    deepStrictEqual(expected.resultList, [4, 5]);

    // Make sure that we don't create a new record for other parts
    expect(given.byId === expected.byId).toBe(true);
  });
});
