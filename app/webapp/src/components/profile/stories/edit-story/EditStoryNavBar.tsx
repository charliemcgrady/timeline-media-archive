import React, { FunctionComponent } from "react";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import NavBar from "~/components/pure/affordances/NavBar";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IconButton, CircularProgress, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { AppState } from "~/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { storiesActions } from "~/redux/actions";

interface Props extends RouteComponentProps<{}> {
  story: StoryConfig;
  setStory: (story: StoryConfig) => void;
}

const EditStory: FunctionComponent<Props> = ({ story, children, history }) => {
  const dispatch = useDispatch();
  const { saveLoading } = useSelector(
    (state: AppState) => state.userData.stories
  );

  return (
    <div>
      <NavBar
        title={story.title}
        leftSlot={
          <IconButton
            color="inherit"
            onClick={() => history.push("/profile/stories")}
          >
            <ArrowBackIcon />
          </IconButton>
        }
        rightSlot={
          saveLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <Button
              color="inherit"
              onClick={() => dispatch(storiesActions.saveStory(story))}
            >
              Save Story
            </Button>
          )
        }
      >
        {children}
      </NavBar>
    </div>
  );
};

export default withRouter(EditStory);
