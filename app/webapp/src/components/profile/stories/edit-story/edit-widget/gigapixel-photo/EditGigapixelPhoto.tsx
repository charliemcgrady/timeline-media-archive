import React, { FunctionComponent, useEffect } from "react";
import { WidgetConfig } from "~/rgb-commons/types/widgets";
import MediaGrid from "~/components/pure/widgets/media-grid/MediaGrid";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { mediaActions } from "~/redux/actions";
import LoadingSpinner from "~/components/pure/affordances/LoadingSpinner";
import { MediaType } from "~/rgb-commons/types/media";
import { StoryConfig } from "~/rgb-commons/types/story-config";

interface Props {
  story: StoryConfig;
  widget: WidgetConfig;
  setWidget: (widget: WidgetConfig) => void;
  setStory: (story: StoryConfig) => void;
}

const EditGigapixelPhoto: FunctionComponent<Props> = ({
  story,
  widget,
  setWidget,
  setStory
}) => {
  const dispatch = useDispatch();
  const { fetchLoading, mediaMap } = useSelector(
    (state: AppState) => state.userData.media
  );

  useEffect(() => {
    dispatch(mediaActions.fetchMedia());
  }, []);

  return (
    <>
      {!fetchLoading && widget.media && (
        <MediaGrid
          disabledMediaIds={widget.media.map(m => m.id)}
          media={Object.keys(mediaMap)
            .map(id => mediaMap[id])
            .filter(m => m.type === MediaType.GIGAPIXEL_PHOTO)}
          metadata={{ targetRowHeight: 100 }}
          onMediaClicked={(id: string) => {
            const newStory = Object.assign({}, story);
            const newWidget = {
              ...widget,
              media: [mediaMap[id]]
            };

            newStory.media[id] = {
              type: MediaType.GIGAPIXEL_PHOTO,
              ...mediaMap[id]
            };

            setWidget(newWidget);
            setStory(story);
          }}
        />
      )}
      <LoadingSpinner isLoading={fetchLoading} />
    </>
  );
};

export default EditGigapixelPhoto;
