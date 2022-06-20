import { FC } from "react";
import { placeholder } from "../../common/utilities";
import { Video } from "../../domain";
import Image from "./Image";

const Video: FC<Video> = ({ image_url, artist, title }) => {
  return (
    <figure className="span1">
      <Image src={image_url} placeholder={placeholder(522, 292)} />
      <figcaption>
        <h2>{artist}</h2>
        <p>{title}</p>
      </figcaption>
    </figure>
  );
};

export default Video;
