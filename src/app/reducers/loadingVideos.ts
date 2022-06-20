import { FetchSuccess } from "../../actions";
import { Loading, Videos } from "../../domain";

const loadingVideos = (_state: Loading, action: FetchSuccess): Videos => {
  return action.payload.videos;
};

export default loadingVideos;
