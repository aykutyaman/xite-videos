import { SearchChanged } from "../../actions";
import { assertNever, noTransition } from "../../common/utilities";
import { Search } from "../../domain";

const search = (state: Search, action: SearchChanged): Search => {
  switch (state.type) {
    case "SearchActive":
      switch (action.type) {
        // TODO: maybe we should use SearchChangedWithValue or something
        // to prevent if check
        case "Act::SearchChanged":
          return action.searchText.length === 0
            ? {
                type: "SearchPassive",
              }
            : {
                ...state,
                result: action.payload,
              };
        default:
          return assertNever(action.type);
      }
    case "SearchPassive":
      switch (action.type) {
        case "Act::SearchChanged":
          return action.searchText.length > 0
            ? {
                type: "SearchActive",
                result: action.payload,
              }
            : noTransition(state, action);
        default:
          return assertNever(action.type);
      }

    default:
      return assertNever(state);
  }
};

export default search;
