import { useSelector } from "react-redux";
import { assertNever } from "../common/utilities";
import { RootState } from "./store";
import Videos from "./containers/VideosContainer";
import Idle from "./components/Idle";
import Loading from "./components/Loading";
import "../styles.css";
import { identity } from "rxjs";

const App = (): JSX.Element => {
  const state = useSelector<RootState, RootState>(identity);

  // TODO: make this switch a HOC
  let component;
  switch (state.type) {
    case "Idle":
      component = <Idle />;
      break;
    case "Loading":
      component = <Loading />;
      break;
    case "Videos":
      component = <Videos />;
      break;
    default:
      assertNever(state);
  }

  return <>{component}</>;
};

export default App;
