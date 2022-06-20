import { memo, useState, useEffect, FC } from "react";

type Props = {
  src: string;
  placeholder: string;
};

const ProgressiveImage: FC<Props> = memo(({ src, placeholder }) => {
  const [currentSrc, updateCurrentSrc] = useState(placeholder);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      updateCurrentSrc(src);
    };
  }, [src]);

  return <img src={currentSrc} />;
});

export default ProgressiveImage;
