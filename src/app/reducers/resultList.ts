import { intersection } from "../../common/utilities";
import { Videos, VideoId } from "../../domain";

const getYearSelection = (state: Videos): VideoId[][] => {
  if (state.yearSelection.type === "YearActive") {
    const byYear = state.listByYear[state.yearSelection.year];

    if (byYear) {
      return [byYear];
    }
  }
  return [];
};

const getSearch = (state: Videos): VideoId[][] => {
  return state.search.type === "SearchActive" ? [state.search.result] : [];
};

const getGenreSelection = (state: Videos): VideoId[][] => {
  if (state.genreSelection.type === "GenreActive") {
    // TODO: use a transducer to iterate only once
    const byGenre = state.genreSelection.selectedGenres
      .map((genreId) => state.listByGenre[genreId])
      .filter((genreId) => (genreId === undefined ? false : true))
      .reduce((acc, genres) => acc.concat(genres));
    return [byGenre];
  }
  return [];
};

const getAllSelectionsResult = (state: Videos): Array<VideoId[]> =>
  Array.from([getYearSelection, getSearch, getGenreSelection])
    .map((fn) => fn(state))
    .reduce<Array<VideoId[]>>((acc, value) => acc.concat(value), []);

const calculateResultList = (state: Videos, maxVideos: number): VideoId[] => {
  const list = getAllSelectionsResult(state);

  return list.length > 0
    ? intersection(list).slice(0, maxVideos)
    : // There is no any result from the selections so return first 16 videos from list
      Object.keys(state.byId)
        .slice(0, maxVideos)
        .map((video) => Number(video)); // TODO: it's not type safe
};

const resultList = (state: Videos): Videos => {
  return {
    ...state,
    resultList: calculateResultList(state, 20),
  };
};

export default resultList;
