import { YearChangedSelected, YearChangedUnselected } from "../../actions";
import { assertNever, noTransition } from "../../common/utilities";
import { YearSelection } from "../../domain";

const yearSelection = (
  state: YearSelection,
  action: YearChangedSelected | YearChangedUnselected
): YearSelection => {
  switch (state.type) {
    case "YearActive":
      switch (action.type) {
        case "Act::YearChangedSelected":
          return {
            type: "YearActive",
            year: action.selectedYear,
          };
        case "Act::YearChangedUnselected":
          return {
            type: "YearPassive",
          };
        default:
          return assertNever(action);
      }
    case "YearPassive":
      switch (action.type) {
        case "Act::YearChangedSelected":
          return {
            type: "YearActive",
            year: action.selectedYear,
          };
        case "Act::YearChangedUnselected":
          return noTransition(state, action);
        default:
          return assertNever(action);
      }
    default:
      return assertNever(state);
  }
};

export default yearSelection;
