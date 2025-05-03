import React, { FunctionComponent, useRef, useEffect } from "react";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import { useSelector } from "react-redux";
import MediaGrid from "~/components/pure/widgets/media-grid/MediaGrid";
import { AppState } from "~/redux/store";
import { useMapPageLayout } from "../useMapPageLayout";
import {
  createStyles,
  makeStyles,
  Theme,
  Divider,
  Typography
} from "@material-ui/core";
import { getClassName } from "~/components/pure/widgets/media-grid/Image";

const targetRowHeight = 75;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center"
    },
    browseMediaDivider: {
      textAlign: "left",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(3)
    },
    timelineInstructions: {
      marginTop: theme.spacing(2)
    },
    mediaGrid: {
      height: window.innerHeight,
      paddingBottom: window.innerHeight,
      overflowY: "scroll",
      marginTop: theme.spacing(3)
    },
    mobileTimeline: {
      height: "auto",
      width: window.innerWidth,
      backgroundColor: "white",
      position: "fixed",
      bottom: 0,
      zIndex: 2000
    }
  })
);

const AllMedia: FunctionComponent<{}> = () => {
  const mediaMap = useSelector(
    (state: AppState) => state.userData.media.mediaMap
  );

  const { setAppliedFilter, mediaIds, appliedFilter } = useAppliedFilter();

  const mediaGridRef = useRef<HTMLDivElement>(null);
  const activeMediaIdRef = useRef(appliedFilter.activeMediaId);

  const layout = useMapPageLayout();

  const onMediaClicked = (id: string) => {
    setAppliedFilter({ activeMediaId: id, zoomToPhoto: true });
  };

  useEffect(() => {
    if (
      mediaGridRef.current &&
      appliedFilter.activeMediaId &&
      activeMediaIdRef.current !== appliedFilter.activeMediaId
    ) {
      const elem: any = mediaGridRef.current.getElementsByClassName(
        getClassName(appliedFilter.activeMediaId)
      );

      if (elem && elem[0]) {
        mediaGridRef.current.scroll(0, elem[0].offsetTop - targetRowHeight);
      }
    }
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <>
        {/* {isDesktop && (
          <>
            <div className={classes.browseMediaDivider}>
              <Typography
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Timeline
              </Typography>
            </div>
            <Divider />
            <Typography
              color="textSecondary"
              display="block"
              variant="caption"
              className={classes.timelineInstructions}
            >
              <i>Click bars to select photos...</i>
            </Typography>
          </>
        )}
        {isDesktop ? (
          <TimeFilter />
        ) : (
          <div className={!isDesktop && classes.mobileTimeline}>
            <TimeFilter />
          </div>
        )} */}
      </>
      {/** Create an id used for auto-scroll to photo upon ingress; hardcoded. */}
      <div className={classes.browseMediaDivider}>
        <Typography color="textSecondary" display="block" variant="caption">
          Photos in View
        </Typography>
      </div>
      <Divider />
      <MediaGrid
        disabledMediaIds={
          appliedFilter.activeMediaId ? [appliedFilter.activeMediaId] : []
        }
        onMediaClicked={onMediaClicked}
        media={mediaIds.unfiltered.map(id => mediaMap[id])}
        metadata={{
          boxSpacing: { horizontal: 0, vertical: 0 },
          targetRowHeight,
          containerWidth: layout.rightPanel.width as number
        }}
      />
    </div>
  );
};

export default AllMedia;
