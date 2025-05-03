import React, { useEffect } from "react";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles, Theme, createStyles, Tooltip } from "@material-ui/core";
import { buildImageUrl, Size } from "~/rgb-commons/util/mediaUrls";
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
    },
    leftArrow: {
      color: "black",
      zIndex: 1000,
      flex: 1
    },
    rightArrow: {
      color: "black",
      zIndex: 1000,
      flex: 1
    },
    selectedImageWrapper: {
      display: "flex",
      alignItems: "center"
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

    const currentIndex = mediaIds.unfiltered.indexOf(
      appliedFilter.activeMediaId
    );

    const nextIndex =
      currentIndex === mediaIds.unfiltered.length - 1 ? 0 : currentIndex + 1;

    setAppliedFilter({ activeMediaId: mediaIds.unfiltered[nextIndex] });
  };

  const decrementActiveMediaId = () => {
    if (!appliedFilter.activeMediaId) {
      return;
    }

    const currentIndex = mediaIds.unfiltered.indexOf(
      appliedFilter.activeMediaId
    );

    const nextIndex =
      currentIndex === 0 ? mediaIds.unfiltered.length - 1 : currentIndex - 1;

    setAppliedFilter({ activeMediaId: mediaIds.unfiltered[nextIndex] });
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      // If Photoswipe is open, let it manage which photo is active
      if (document.getElementsByClassName("pswp--open").length > 0) {
        return;
      }

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
        <>
          <div className={classes.selectedImageWrapper}>
            <Tooltip
              title="Previous photo (tip: use arrow keys)"
              className={classes.leftArrow}
            >
              <ArrowBackIosIcon
                color="primary"
                fontSize="large"
                className={classes.icon}
                onClick={incrementActiveMediaId}
              />
            </Tooltip>
            <img
              style={{ cursor: "pointer", flex: 1 }}
              src={buildImageUrl(appliedFilter.activeMediaId, Size.Medium)}
              className={`${classes.activeImage}`}
              onClick={() => {
                const { items, startingIndex } = photosToPhotoswipeItems(
                  mediaIds.unfiltered.map(id => mediaMap[id]),
                  appliedFilter.activeMediaId
                );
                openPhotoswipe(items, startingIndex, (id: string) => {
                  setAppliedFilter({ activeMediaId: id });
                });
              }}
            />
            <Tooltip
              title="Next photo (tip: use arrow keys)"
              className={classes.rightArrow}
            >
              <ArrowForwardIosIcon
                color="primary"
                fontSize="large"
                onClick={decrementActiveMediaId}
                className={classes.icon}
              />
            </Tooltip>
          </div>
        </>
      )}
    </>
  );
};

export default MediaNavigationArrows;
