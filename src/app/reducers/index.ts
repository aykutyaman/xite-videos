import { State, initialState } from "../../domain";
import { Action } from "../../actions";
import { assertNever, noTransition } from "../../common/utilities";
import loading from "./loading";
import videos from "./videos";
import loadingVideos from "./loadingVideos";
import resultList from "./resultList";
import { isAction } from "../../common/guards";

// redux dispatches internal actions such as @@redux/INIT. We consider
// them unknown
type RootAction = Action | unknown;

const reducer = (state: State = initialState, action: RootAction): State => {
  // If the action is not an app action return the state
  if (!isAction(action)) {
    return state;
  }
  switch (state.type) {
    case "Idle":
      switch (action.type) {
        case "Act::Fetch":
          return loading(state, action);
        case "Act::FetchSuccess":
        case "Act::FetchFailure":
        case "Act::JSONFailure":
        case "Act::SearchChanged":
        case "Act::YearChangedSelected":
        case "Act::YearChangedUnselected":
        case "Act::GenreChangedSelected":
        case "Act::GenreChangedUnselected":
          return noTransition(state, action);
        default:
          return assertNever(action);
      }
    case "Loading":
      switch (action.type) {
        case "Act::Fetch":
        case "Act::SearchChanged":
        case "Act::YearChangedSelected":
        case "Act::YearChangedUnselected":
        case "Act::GenreChangedSelected":
        case "Act::GenreChangedUnselected":
          return noTransition(state, action);
        case "Act::FetchSuccess":
          return resultList(loadingVideos(state, action));
        case "Act::FetchFailure":
          // TODO: handle the fetch error case (show a message/retry etc)
          return state;
        case "Act::JSONFailure":
          // TODO: decide what to do when there is a json failure
          return state;
        default:
          return assertNever(action);
      }
    case "Videos":
      switch (action.type) {
        case "Act::SearchChanged":
        case "Act::YearChangedSelected":
        case "Act::YearChangedUnselected":
        case "Act::GenreChangedSelected":
        case "Act::GenreChangedUnselected":
          return resultList(videos(state, action));
        case "Act::Fetch":
        case "Act::SearchChanged":
        case "Act::FetchSuccess":
        case "Act::FetchFailure":
        case "Act::JSONFailure":
          return noTransition(state, action);
        default:
          return assertNever(action);
      }
    default:
      return assertNever(state);
  }
};

export default reducer;
