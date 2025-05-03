import React, { FunctionComponent } from "react";
import Media from "~/components/profile/media/Media";
import { MediaType } from "~/rgb-commons/types/media";

const PhotosphereMedia: FunctionComponent<{}> = () => {
  return <Media mediaType={MediaType.PHOTOSPHERE}></Media>;
};

export default PhotosphereMedia;
