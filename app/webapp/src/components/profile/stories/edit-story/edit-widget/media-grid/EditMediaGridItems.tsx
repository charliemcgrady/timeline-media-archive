import React, { FunctionComponent, useEffect } from "react";
import { WidgetConfig } from "~/rgb-commons/types/widgets";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import MediaGridWidget from "~/components/pure/widgets/media-grid/MediaGrid";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { mediaActions } from "~/redux/actions";
import LoadingSpinner from "~/components/pure/affordances/LoadingSpinner";
import { MediaType } from "~/rgb-commons/types/media";
import { Typography, Container } from "@material-ui/core";

interface Props {
  widget: WidgetConfig;
  setWidget: (widget: WidgetConfig) => void;
  story: StoryConfig;
  setStory: (story: StoryConfig) => void;
}

const EditMediaGridItems: FunctionComponent<Props> = ({
  widget,
  setWidget,
  story,
  setStory
}) => {
  const dispatch = useDispatch();
  const { fetchLoading, mediaMap } = useSelector(
    (state: AppState) => state.userData.media
  );

  useEffect(() => {
    dispatch(mediaActions.fetchMedia());
  }, []);

  const addOrRemoveMedia = (id: string) => {
    const newWidget = Object.assign({}, widget);
    const newStory = Object.assign({}, story);

    let remove = false;
    widget.media!.forEach(w => {
      if (w.id === id) remove = true;
    });

    if (remove) {
      // ! operator is ok because media grids will always have media
      newWidget.media = newWidget.media!.filter(w => w.id !== id);
    } else {
      newWidget.media!.push({
        id,
        type: MediaType.PHOTO
      });
    }

    newStory.media[id] = {
      type: MediaType.PHOTO,
      ...mediaMap[id]
    };

    setWidget(newWidget);
    setStory(story);
  };

  return (
    <>
      {!fetchLoading && (
        <div>
          <Container style={{ textAlign: "center" }}>
            <Typography variant="body1">Tap to add or remove photos</Typography>
          </Container>
          <MediaGridWidget
            onMediaClicked={addOrRemoveMedia}
            disabledMediaIds={widget.media!.map(m => m.id)}
            media={Object.keys(mediaMap)
              .map(id => mediaMap[id])
              .filter(m => m.type === MediaType.PHOTO)}
            metadata={{
              targetRowHeight: 70,
              boxSpacing: { vertical: 5, horizontal: 5 }
            }}
          />
        </div>
      )}
      <LoadingSpinner isLoading={fetchLoading} />
    </>
  );
};

export default EditMediaGridItems;
