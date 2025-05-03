import React, { FunctionComponent } from "react";
import MediaGrid from "~/components/pure/widgets/media-grid/MediaGrid";
import { useTheme } from "@material-ui/core";
import * as Widget from "~/rgb-commons/types/widgets";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import { useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { useIsDesktop } from "~/components/media/useIsDesktop";

const ViewMediaFeed: FunctionComponent<{}> = () => {
  const { mediaIds } = useAppliedFilter();
  const theme = useTheme();
  const mediaMap = useSelector(
    (state: AppState) => state.userData.media.mediaMap
  );

  const isDesktop = useIsDesktop();

  let metadata: Widget.MediaGrid.Metadata = {
    makePhotosFullHeight: true,
    boxSpacing: isDesktop
      ? {
          vertical: 5,
          horizontal: 5
        }
      : {
          vertical: 0,
          horizontal: 0
        },
    containerWidth: window.innerWidth,
    containerPadding: {
      top: theme.spacing(2),
      bottom: 0,
      right: theme.spacing(1),
      left: theme.spacing(1)
    }
  };

  return (
    <MediaGrid
      media={mediaIds.unfiltered.map(id => mediaMap[id])}
      metadata={metadata}
    />
  );
};

export default ViewMediaFeed;
