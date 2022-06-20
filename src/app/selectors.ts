import { isVideo } from "../common/guards";
import { VideoId, Video, Year, Genre, ById } from "../domain";
import { RootState } from "./store";

// TODO: refactor and test these selectors

export const videosResultList = (state: RootState): VideoId[] => {
  switch (state.type) {
    case "Videos":
      return state.resultList;
    default:
      return [];
  }
};

export const videoById =
  (id: VideoId) =>
  (state: RootState): Video | null => {
    let video = null;
    switch (state.type) {
      case "Videos":
        const value = state.byId[id];
        if (isVideo(value)) {
          video = value;
        }
        break;
      default:
        video = null;
    }
    return video;
  };

export const byId = (state: RootState): ById => {
  switch (state.type) {
    case "Videos":
      return state.byId;
    default:
      return {};
  }
};

export const years = (state: RootState): Year[] => {
  switch (state.type) {
    case "Videos":
      // TODO: Maybe we should return listByYear and give the responsability of building
      // the array(with memoization) to the consumer.
      return Object.keys(state.listByYear).map(Number);
    default:
      return [];
  }
};

export const genres = (state: RootState): Genre[] => {
  switch (state.type) {
    case "Videos":
      return state.genreSelection.allGenres;
    default:
      return [];
  }
};
