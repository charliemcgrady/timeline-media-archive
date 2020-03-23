import React, { FunctionComponent, useRef, useEffect } from "react";
import NavigateMedia from "./nav/NavigateMedia";
import AllMedia from "./results/AllMedia";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import ViewStoryBubbles from "../ViewStoryBubbles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    caption: {
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      maxHeight: 400,
      overflowY: "scroll",
      marginBottom: theme.spacing(4)
    }
  })
);

const ViewMediaPanel: FunctionComponent<{}> = () => {
  const history = useHistory();
  const { mediaMap } = useSelector((state: AppState) => state.userData.media);
  const { appliedFilter } = useAppliedFilter();
  const activeMediaIdRef = useRef(appliedFilter.activeMediaId);
  const mediaNavRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      mediaNavRef.current &&
      activeMediaIdRef.current !== appliedFilter.activeMediaId
    ) {
      mediaNavRef.current.scrollIntoView();
    }
    activeMediaIdRef.current = appliedFilter.activeMediaId;
  });

  const classes = useStyles();

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div ref={mediaNavRef}>
        <NavigateMedia />
        {appliedFilter.activeMediaId &&
          mediaMap[appliedFilter.activeMediaId].caption && (
            <Typography variant="body1" className={classes.caption}>
              {mediaMap[appliedFilter.activeMediaId].caption}
            </Typography>
          )}
      </div>
      {appliedFilter.activeMediaId && (
        <ViewStoryBubbles
          onClick={id => history.push(`/stories/${id}?returnTo=/media/map`)}
        />
      )}
      <AllMedia />
    </div>
  );
};

export default ViewMediaPanel;
