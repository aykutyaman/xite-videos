import { describe, test } from "@jest/globals";
import { deepStrictEqual } from "assert";
import { Action } from "../../../actions";
import { State } from "../../../domain";
import reducer from "../";
import normalizer, { initialVideos } from "../../../common/normalizer";
import { sample } from "../../../common/__tests__/normalizer.test";

/*
  State transition tests.
  TODO: These are only sample tests. We should automate test case generation with properties based testing
  or model based testing.
*/
describe("reducer", () => {
  test("Idle-Fetch-Loading", () => {
    /*
    given the state is Idle
    when videos are started fetching from the server
    then the state is Loading
    */
    const given: State = {
      type: "Idle",
    };
    const when: Action = {
      type: "Act::Fetch",
    };
    const then: State = {
      type: "Loading",
    };

    deepStrictEqual(reducer(given, when), then);
  });

  test("Loading-FetchSuccess-Videos", () => {
    const given: State = {
      type: "Loading",
    };
    const when: Action = {
      type: "Act::FetchSuccess",
      payload: {
        ioErrors: [],
        videos: initialVideos,
      },
    };
    const then: State = initialVideos;

    deepStrictEqual(reducer(given, when), then);
  });

  test("Videos-SearchChanged-Videos", () => {
    const given = normalizer(sample).videos;
    const when: Action = {
      type: "Act::SearchChanged",
      payload: [1, 2, 3],
      searchText: "hello",
    };
    const then: State = {
      ...normalizer(sample).videos,
      search: {
        type: "SearchActive",
        result: [1, 2, 3],
      },
      resultList: [1, 2, 3],
    };
    deepStrictEqual(reducer(given, when), then);
  });

  test("Videos-YearChangedSelected-Videos with search active", () => {
    const given: State = {
      ...normalizer(sample).videos,
      search: {
        type: "SearchActive",
        result: [502139, 505238],
      },
    };
    const when: Action = {
      type: "Act::YearChangedSelected",
      selectedYear: 2011,
    };
    const then: State = {
      ...normalizer(sample).videos,
      search: {
        type: "SearchActive",
        result: [502139, 505238],
      },
      yearSelection: {
        type: "YearActive",
        year: 2011,
      },
      resultList: [502139],
    };
    deepStrictEqual(reducer(given, when), then);
  });
});
