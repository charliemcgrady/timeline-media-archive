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

const SelectScene: FunctionComponent<Props> = ({
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

  const addScene = (id: string) => {
    const newStory = Object.assign({}, story);

    const newWidget = {
      ...widget,
      media: [{ id, type: MediaType.PHOTOSPHERE }],
      metadata: {
        ...widget.metadata,
        scenes: [
          {
            id,
            name: id,
            levels: [
              {
                tileSize: 256,
                size: 256,
                fallbackOnly: true
              },
              {
                tileSize: 512,
                size: 512
              },
              {
                tileSize: 512,
                size: 1024
              },
              {
                tileSize: 512,
                size: 2048
              }
            ],
            faceSize: 2048,
            initialViewParameters: {
              pitch: 0,
              yaw: 0,
              fov: 1.5707963267948966
            }
          }
        ]
      }
    };

    newWidget.media = [
      {
        id,
        type: MediaType.PHOTOSPHERE
      }
    ];

    newStory.media[id] = {
      type: MediaType.PHOTOSPHERE,
      ...mediaMap[id]
    };

    setWidget(newWidget);
    setStory(newStory);
  };

  return (
    <>
      {!fetchLoading && (
        <div>
          <Container style={{ textAlign: "center" }}>
            <Typography variant="body1">Select a photo sphere</Typography>
          </Container>
          <MediaGridWidget
            onMediaClicked={addScene}
            disabledMediaIds={widget.media!.map(m => m.id)}
            media={Object.keys(mediaMap)
              .map(id => mediaMap[id])
              .filter(m => m.type === MediaType.PHOTOSPHERE)}
            metadata={{
              targetRowHeight: 150,
              boxSpacing: { vertical: 5, horizontal: 5 }
            }}
          />
        </div>
      )}
      <LoadingSpinner isLoading={fetchLoading} />
    </>
  );
};

export default SelectScene;
