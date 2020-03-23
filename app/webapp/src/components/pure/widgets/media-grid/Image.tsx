import React, { FunctionComponent, CSSProperties } from "react";
import { Size, buildImageUrl } from "~/util/mediaUrls";

export interface Props {
  id: string;
  disabled?: boolean;
  onClick?: (id: string) => void;
  targetPhotoHeight?: number;
  layoutStyle: CSSProperties;
}

export const getClassName = (id: string) => {
  const split = id.split(".");
  return split[split.length - 1];
};

const Image: FunctionComponent<Props> = ({
  id,
  targetPhotoHeight,
  layoutStyle,
  disabled = false,
  onClick = () => {}
}) => {
  let imageSrc = buildImageUrl(id, Size.Large);
  if (targetPhotoHeight && targetPhotoHeight < 75) {
    imageSrc = buildImageUrl(id, Size.Small);
  } else if (targetPhotoHeight && targetPhotoHeight < 200) {
    imageSrc = buildImageUrl(id, Size.Medium);
  }

  return (
    <img
      className={getClassName(id)}
      onClick={() => onClick(id)}
      data-src={imageSrc}
      style={{
        ...layoutStyle,
        cursor: "pointer",
        opacity: disabled ? 0.5 : 1
      }}
    />
  );
};

export default Image;
