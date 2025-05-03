import React, { FunctionComponent, useEffect } from "react";
import ViewMediaFeed from "./results/ViewMediaFeed";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import ViewStoryBubbles from "../ViewStoryBubbles";
import { useHistory } from "react-router-dom";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import BrowseMediaNav from "../browser/nav/BrowseMediaNav";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3)
    }
  })
);

const MediaFeed: FunctionComponent<{}> = () => {
  const history = useHistory();

  const { setAppliedFilter } = useAppliedFilter();

  // Initialize the feed with no active filter
  useEffect(() => {
    setAppliedFilter({ rating: undefined, geospatialGeometry: undefined });
  }, []);

  const classes = useStyles();

  return (
    <BrowseMediaNav>
      <div className={classes.root}>
        <ViewStoryBubbles
          {...{
            onClick: (id: string) => history.push(`/stories/${id}`)
          }}
          showAllStories={true}
        />
        <ViewMediaFeed />
      </div>
    </BrowseMediaNav>
  );
};

export default MediaFeed;
