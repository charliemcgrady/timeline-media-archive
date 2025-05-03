import React, { FunctionComponent } from "react";
import Media from "~/components/profile/media/Media";
import { MediaType } from "~/rgb-commons/types/media";

const GigapixelPhotosMedia: FunctionComponent<{}> = () => {
  return <Media mediaType={MediaType.GIGAPIXEL_PHOTO}></Media>;
};

export default GigapixelPhotosMedia;
