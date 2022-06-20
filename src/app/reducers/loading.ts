import { Fetch } from "../../actions";
import { Idle, Loading } from "../../domain";

const loading = (_state: Idle, _action: Fetch): Loading => {
  return {
    type: "Loading",
  };
};

export default loading;
