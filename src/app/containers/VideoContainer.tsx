import { ComponentType } from "react";
import { useSelector } from "react-redux";
import { Video } from "../../domain";
import { videoById } from "../selectors";
import VideoCompoment from "../components/Video";

export type ContainerProps = {
  id: number;
};

function Container<T extends Video>(Component: ComponentType<T>) {
  return (props: Pick<T, keyof ContainerProps>) => {
    // TODO: if the video is null we have a bug. So, what to do in this case?
    // (what will we show to the user, how to log it etc.)
    const video = useSelector(videoById(props.id));

    return video ? <Component {...(video as T)} /> : null;
  };
}

export default Container(VideoCompoment);
