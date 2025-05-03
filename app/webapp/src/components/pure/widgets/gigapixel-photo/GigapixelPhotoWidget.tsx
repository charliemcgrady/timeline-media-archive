import React, { FunctionComponent, useLayoutEffect } from "react";
import { GigapixelPhoto } from "~/rgb-commons/types/widgets";
import { Viewer } from "openseadragon";
import { buildGigapixelManifestUrl } from '~/rgb-commons/util/mediaUrls';

const DEFAULT_VERTICAL_PADDING = 100;
const DEFAULT_HORIZONTAL_PADDING = 20;

interface Props {
  metadata: GigapixelPhoto.Metadata;
  media: Array<GigapixelPhoto.RequiredMediaConfig>;
}

const GigapixelPhotoWidget: FunctionComponent<Props> = ({
  metadata,
  media
}) => {
  if (media.length === 0) {
    return <span></span>;
  }

  useLayoutEffect(() => {
    new Viewer({
      id: media[0].id,
      prefixUrl:
        "https://charliemcgrady-webapp-manually-managed-assets.s3-us-west-2.amazonaws.com/openseadragon/",
      showNavigator: true,
      constrainDuringPan: true,
      tileSources: buildGigapixelManifestUrl(media[0].id)
    });
  }, []);
  
  return (
    <div
      id={media[0].id}
      style={{
        marginLeft: DEFAULT_HORIZONTAL_PADDING,
        width:
          metadata.width || window.innerWidth - 2 * DEFAULT_HORIZONTAL_PADDING,
        height:
          metadata.height || window.innerHeight - 2 * DEFAULT_VERTICAL_PADDING
      }}
    />
  );
};

export default GigapixelPhotoWidget;
