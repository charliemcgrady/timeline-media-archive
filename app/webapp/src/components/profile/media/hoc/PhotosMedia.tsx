import React, { FunctionComponent } from "react";
import Media from "~/components/profile/media/Media";
import { MediaType } from "~/rgb-commons/types/media";

const PhotosMedia: FunctionComponent<{}> = () => {
  return <Media mediaType={MediaType.PHOTO}></Media>;
};

export default PhotosMedia;
