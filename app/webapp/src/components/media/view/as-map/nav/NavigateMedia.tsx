import React, { useEffect } from "react";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Tooltip
} from "@material-ui/core";
import { buildImageUrl, Size } from "~/util/mediaUrls";
import {
  photosToPhotoswipeItems,
  openPhotoswipe
} from "~/components/pure/widgets/photoswipe/photoswipeUtils";
import { useSelector } from "react-redux";
import { AppState } from "~/redux/store";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      marginRight: "auto",
      marginLeft: "auto",
      paddingTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      maxWidth: 400
    },
    icon: {
      cursor: "pointer",
      fontSize: 50,
      marginTop: 37
    },
    activeImageWrapper: {
      textAlign: "center"
    },
    activeImage: {
      maxWidth: 200,
      height: "auto"
    }
  });
});

const MediaNavigationArrows: React.FunctionComponent<{}> = () => {
  const { appliedFilter, setAppliedFilter, mediaIds } = useAppliedFilter();

  const { mediaMap } = useSelector((state: AppState) => state.userData.media);

  const classes = useStyles();

  const incrementActiveMediaId = () => {
    if (!appliedFilter.activeMediaId) {
      return;
    }

    const currentIndex = mediaIds.eligible.indexOf(appliedFilter.activeMediaId);

    const nextIndex =
      currentIndex === mediaIds.eligible.length - 1 ? 0 : currentIndex + 1;

    setAppliedFilter({ activeMediaId: mediaIds.eligible[nextIndex] });
  };

  const decrementActiveMediaId = () => {
    if (!appliedFilter.activeMediaId) {
      return;
    }

    const currentIndex = mediaIds.eligible.indexOf(appliedFilter.activeMediaId);

    const nextIndex =
      currentIndex === 0 ? mediaIds.eligible.length - 1 : currentIndex - 1;

    setAppliedFilter({ activeMediaId: mediaIds.eligible[nextIndex] });
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      // Right key pressed
      if (event.keyCode === 39) {
        incrementActiveMediaId();
      }
      // Left key pressed
      if (event.keyCode === 37) {
        decrementActiveMediaId();
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  });

  return (
    <>
      {appliedFilter.activeMediaId && (
        <Grid container className={classes.root}>
          <Tooltip title="Previous photo in time (tip: use arrow keys)">
            <Grid item xs={1}>
              <ArrowBackIosIcon
                color="primary"
                fontSize="large"
                className={classes.icon}
                onClick={decrementActiveMediaId}
              />
            </Grid>
          </Tooltip>
          <Grid item xs={10} className={classes.activeImageWrapper}>
            <img
              style={{ cursor: "pointer" }}
              src={buildImageUrl(appliedFilter.activeMediaId, Size.Small)}
              className={`${classes.activeImage}`}
              onClick={() => {
                const { items, startingIndex } = photosToPhotoswipeItems(
                  mediaIds.eligible.map(id => mediaMap[id]),
                  appliedFilter.activeMediaId
                );
                openPhotoswipe(items, startingIndex);
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Next photo in time (tip: use arrow keys)">
              <ArrowForwardIosIcon
                color="primary"
                fontSize="large"
                onClick={incrementActiveMediaId}
                className={classes.icon}
              />
            </Tooltip>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MediaNavigationArrows;
