import React, { FunctionComponent } from "react";
import {
  Avatar,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Divider
} from "@material-ui/core";
import { buildImageUrl, Size } from "~/rgb-commons/util/mediaUrls";
import { useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";

import { useMediaView } from "~/components/media/useMediaView";
import { ViewType } from "~/components/media/view-type";

const storyBubbleWidth = 100;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      width: "100%",
      marginTop: theme.spacing(2)
    },
    avatar: {
      width: 50,
      height: 50,
      margin: "auto",
      marginBottom: theme.spacing(1)
    },
    storyBubble: {
      width: storyBubbleWidth,
      textAlign: "center",
      display: "inline-block",
      fontSize: 11,
      verticalAlign: "top",
      cursor: "pointer"
    },
    storyBubbles: {
      textAlign: "center",
      width: "100%",
      marginBottom: theme.spacing(2),
      overflow: "scroll"
    },
    storyBubblesLabel: {
      textAlign: "left",
      marginBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  })
);

const ViewStoryBubbles: FunctionComponent<{
  onClick: (id: string) => void;
  showAllStories?: boolean;
}> = ({ onClick, showAllStories = false }) => {
  const stories = useSelector(
    (state: AppState) => state.userData.stories.stories
  );
  const mediaView = useMediaView();

  const { appliedFilter } = useAppliedFilter();

  let storiesToDisplay = Object.keys(stories)
    .filter(id => Object.keys(stories[id].media).length > 0)
    .filter(id => {
      if (!appliedFilter.activeMediaId || showAllStories) {
        return true;
      }

      if (stories[id].media[appliedFilter.activeMediaId]) {
        return true;
      } else {
        return false;
      }
    });
  const classes = useStyles();
  return (
    <>
      {storiesToDisplay.length > 0 && (
        <div className={classes.root}>
          {mediaView.toString() === ViewType.BROWSER.toString() &&
            storiesToDisplay.length > 0 && (
              <div className={classes.storyBubblesLabel}>
                <Typography
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Appears In
                </Typography>
                <Divider />
              </div>
            )}
          <div className={classes.storyBubbles}>
            <div
              style={{
                width: storyBubbleWidth * storiesToDisplay.length,
                margin: "auto"
              }}
            >
              {storiesToDisplay.map(id => (
                <div
                  key={id}
                  className={classes.storyBubble}
                  onClick={() => onClick(id)}
                >
                  <div
                    style={{
                      opacity:
                        appliedFilter.activeStory &&
                        appliedFilter.activeStory.id !== id
                          ? 0.5
                          : 1
                    }}
                  >
                    <Avatar
                      className={classes.avatar}
                      src={buildImageUrl(
                        Object.keys(stories[id].media)[0],
                        Size.Small
                      )}
                    />
                  </div>
                  {stories[id].title}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewStoryBubbles;
