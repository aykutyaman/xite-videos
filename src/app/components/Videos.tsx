import { FC } from "react";
import Search from "./../containers/SearchContainer";
import Filters from "./Filters";
import { VideoId } from "../../domain";
import { groupByNumber } from "../../common/utilities";
import Video from "../containers/VideoContainer";
import ErrorBoundary from "./ErrorBoundary";

type Props = {
  videos: VideoId[];
};

const Videos: FC<Props> = ({ videos }) => {
  // TODO: we render all videos groupped by 4 into the grid system
  // Remove this groupping logic, and render all videos as sibling
  // using flexbox
  const videosGroup = groupByNumber(videos, 4);

  return (
    <>
      <ErrorBoundary>
        {/*-- TODO: Move Search and Filters components outside of the Videos and pass them
           as children, so that we don't have to memoize these components --*/}
        <Search />
        <Filters />
        {videosGroup.map((group, i) => (
          <div className="row video-row" key={i}>
            {group.map((videoId) => (
              <Video id={videoId} key={videoId} />
            ))}
          </div>
        ))}
      </ErrorBoundary>
    </>
  );
};

export default Videos;
