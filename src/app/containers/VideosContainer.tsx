import { ComponentType } from "react";
import { useSelector } from "react-redux";
import { eqArray, eqNumber } from "../../common/Eq";
import { VideoId } from "../../domain";
import Videos from "../components/Videos";
import { videosResultList } from "../selectors";

type ContainerProps = {
  videos: VideoId[];
};

function container<T extends ContainerProps>(
  WrappedComponent: ComponentType<T>
) {
  return (props: Omit<T, keyof ContainerProps>) => {
    const videos = useSelector(videosResultList, eqArray(eqNumber).equals);

    return <WrappedComponent {...(props as T)} videos={videos} />;
  };
}

export default container(Videos);
