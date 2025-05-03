import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { storiesActions } from "~/redux/actions";
import LoadingSpinner from "~/components/pure/affordances/LoadingSpinner";
import { WidgetConfig } from "~/rgb-commons/types/widgets";
import EditWidget from "./EditWidget";

interface Props
  extends RouteComponentProps<{ storyId: string; widgetId: string }> {}

const EditWidgetContainer: FunctionComponent<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const { fetchLoading, stories, fetchError, storyDrafts } = useSelector(
    (state: AppState) => state.userData.stories
  );
  const story =
    storyDrafts[match.params.storyId] || stories[match.params.storyId];

  const [widgetDraft, setWidgetDraft] = useState<WidgetConfig | undefined>(
    undefined
  );

  useEffect(() => {
    if (!stories[match.params.storyId]) {
      dispatch(storiesActions.fetchStory(match.params.storyId));
    }
  }, []);

  // widgetDraft will be undefined until the story api is done and the user has taken action
  let widget = widgetDraft;
  if (!widgetDraft && story) {
    story.widgets.forEach(w => {
      if (w.id === match.params.widgetId) {
        widget = w;
      }
    });
  }

  return (
    <>
      {fetchLoading && <LoadingSpinner />}
      {(!widget && story) || (fetchError && <div>Unable to load widget</div>)}
      {widget && story && (
        <EditWidget
          {...{
            story,
            widget,
            setStory: newStory =>
              dispatch(storiesActions.setStoryDraft(newStory)),
            setWidget: setWidgetDraft
          }}
        />
      )}
    </>
  );
};

export default EditWidgetContainer;
