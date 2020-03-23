import React, { FunctionComponent, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "~/redux/store";
import { storiesActions } from "~/redux/actions";
import LoadingSpinner from "~/components/pure/affordances/LoadingSpinner";
import StoryCard from "./pure/StoryCard";
import { Grid } from "@material-ui/core";

interface Props extends RouteComponentProps<{ id: string }> {}

const EditStories: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const { fetchLoading, stories } = useSelector((state: AppState) => {
    return state.userData.stories;
  });
  useEffect(() => {
    dispatch(storiesActions.fetchStories());
  }, []);

  return (
    <div>
      {fetchLoading ? (
        <LoadingSpinner isLoading={fetchLoading} />
      ) : (
        <Grid container direction="column" justify="center" alignItems="center">
          {Object.keys(stories).map(id => (
            <StoryCard story={stories[id]} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default withRouter(EditStories);
