import React, { FunctionComponent, useEffect } from "react";
import ViewMediaResults from "./results/ViewMediaFeed";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import ViewStoryBubbles from "../ViewStoryBubbles";
import { useHistory } from "react-router-dom";
import ViewMediaAsFeedNav from "./ViewMediaAsFeedNav";
import RatingFilter from "./filters/rating/RatingFilter";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2)
    }
  })
);

const ViewMediaAsFeed: FunctionComponent<{}> = () => {
  const history = useHistory();

  const { setAppliedFilter } = useAppliedFilter();

  // Initialize the feed with no active filter
  useEffect(() => {
    setAppliedFilter({ rating: undefined, geospatialGeometry: undefined });
  }, []);

  const classes = useStyles();

  return (
    <ViewMediaAsFeedNav>
      <div className={classes.root}>
        <ViewStoryBubbles
          {...{
            onClick: (id: string) => history.push(`/stories/${id}`)
          }}
          showAllStories={true}
        />
        <RatingFilter />
        <ViewMediaResults />
      </div>
    </ViewMediaAsFeedNav>
  );
};

export default ViewMediaAsFeed;
