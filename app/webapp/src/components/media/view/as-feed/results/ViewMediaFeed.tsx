import React, { FunctionComponent } from "react";
import MediaGrid from "~/components/pure/widgets/media-grid/MediaGrid";
import { useTheme } from "@material-ui/core";
import * as Widget from "~/rgb-commons/types/widgets";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import { useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { useMediaHeight } from "./useMediaHeight";

const ViewMediaFeed: FunctionComponent<{}> = () => {
  const { mediaIds } = useAppliedFilter();
  const theme = useTheme();
  const mediaMap = useSelector(
    (state: AppState) => state.userData.media.mediaMap
  );

  const { targetRowHeight, targetRowHeightThreshold } = useMediaHeight();

  let metadata: Widget.MediaGrid.Metadata = {
    makePhotosFullHeight: targetRowHeight === targetRowHeightThreshold,
    targetRowHeight,
    containerWidth: window.innerWidth - theme.spacing(2),
    containerPadding: { top: theme.spacing(2), bottom: 0, right: 0, left: 0 }
  };

  return (
    <>
      <MediaGrid
        media={mediaIds.unfiltered.map(id => mediaMap[id])}
        metadata={metadata}
      />
    </>
  );
};

export default ViewMediaFeed;
