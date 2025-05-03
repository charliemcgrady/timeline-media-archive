import React, { FunctionComponent, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "~/redux/store";
import { storiesActions } from "~/redux/actions";
import EditStory from "./EditStory";
import LoadingSpinner from "~/components/pure/affordances/LoadingSpinner";

interface Props extends RouteComponentProps<{ id: string }> {}

const EditStoryContainer: FunctionComponent<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const { fetchLoading, stories, storyDrafts } = useSelector(
    (state: AppState) => state.userData.stories
  );

  useEffect(() => {
    if (!stories[match.params.id]) {
      dispatch(storiesActions.fetchStory(match.params.id));
    }
  }, []);

  // storyDrafts will be undefined until the story api is done and the user has taken action
  const story = storyDrafts[match.params.id] || stories[match.params.id];

  return (
    <div>
      {fetchLoading && <LoadingSpinner />}
      {story && (
        <EditStory
          {...{
            story,
            setStory: newStory =>
              dispatch(storiesActions.setStoryDraft(newStory))
          }}
        />
      )}
    </div>
  );
};

export default withRouter(EditStoryContainer);
