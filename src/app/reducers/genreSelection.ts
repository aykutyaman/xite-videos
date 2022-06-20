import { GenreChangedSelected, GenreChangedUnselected } from "../../actions";
import { assertNever, noTransition } from "../../common/utilities";
import { GenreSelection } from "../../domain";

const genreSelection = (
  state: GenreSelection,
  action: GenreChangedUnselected | GenreChangedSelected
): GenreSelection => {
  switch (state.type) {
    case "GenreActive":
      switch (action.type) {
        case "Act::GenreChangedSelected":
          return {
            ...state,
            type: "GenreActive",
            selectedGenres: action.selectedGenres,
          };
        case "Act::GenreChangedUnselected":
          return {
            type: "GenrePassive",
            allGenres: state.allGenres,
          };
        default:
          return assertNever(action);
      }
    case "GenrePassive":
      switch (action.type) {
        case "Act::GenreChangedSelected":
          return {
            ...state,
            type: "GenreActive",
            selectedGenres: action.selectedGenres,
          };
        case "Act::GenreChangedUnselected":
          return noTransition(state, action);
        default:
          return assertNever(action);
      }
    default:
      return assertNever(state);
  }
};

export default genreSelection;
