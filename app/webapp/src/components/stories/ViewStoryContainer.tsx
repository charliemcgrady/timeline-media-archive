import React, { FunctionComponent, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "~/redux/store";
import { storiesActions } from "~/redux/actions";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import ViewStoryNav from "./ViewStoryNav";
import LoadingSpinner from "../pure/affordances/LoadingSpinner";
import ViewStory from "./ViewStory";

interface Props extends RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2)
    }
  })
);

const ViewStoryContainer: FunctionComponent<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const { fetchLoading, stories } = useSelector(
    (state: AppState) => state.userData.stories
  );

  useEffect(() => {
    dispatch(storiesActions.fetchStory(match.params.id));
  }, []);

  const story = stories[match.params.id];

  const classes = useStyles();

  return (
    <ViewStoryNav>
      <div className={classes.root}>
        {fetchLoading && <LoadingSpinner />}
        {story && <ViewStory {...{ story }} />}
      </div>
    </ViewStoryNav>
  );
};

export default withRouter(ViewStoryContainer);
