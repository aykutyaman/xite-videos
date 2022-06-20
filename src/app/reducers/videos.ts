import { VideosActions } from "../../actions";
import { assertNever } from "../../common/utilities";
import { Videos } from "../../domain";
import search from "./search";
import yearSelection from "./yearSelection";
import genreSelection from "./genreSelection";

const videos = (state: Videos, action: VideosActions): Videos => {
  switch (state.type) {
    case "Videos":
      switch (action.type) {
        case "Act::SearchChanged":
          return {
            ...state,
            search: search(state.search, action),
          };
        case "Act::YearChangedSelected":
        case "Act::YearChangedUnselected":
          return {
            ...state,
            yearSelection: yearSelection(state.yearSelection, action),
          };
        case "Act::GenreChangedSelected":
        case "Act::GenreChangedUnselected":
          return {
            ...state,
            genreSelection: genreSelection(state.genreSelection, action),
          };
        default:
          return assertNever(action);
      }
    default:
      return assertNever(state.type);
  }
};

export default videos;
