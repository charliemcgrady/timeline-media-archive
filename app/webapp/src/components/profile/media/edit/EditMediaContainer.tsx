import React, { FunctionComponent, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import LoadingSpinner from "~/components/pure/affordances/LoadingSpinner";
import { mediaActions } from "~/redux/actions";
import EditMedia from "./EditMedia";
import { MediaMap, MediaLocationMap } from "~/rgb-commons/types/media";

interface Props extends RouteComponentProps<{ id: string }> {}

const EditMediaContainer: FunctionComponent<Props> = ({ match }) => {
  const mediaIdRef = useRef(match.params.id);

  const dispatch = useDispatch();
  const { fetchLoading, mediaMap, mediaLocationMap, mediaOrder } = useSelector(
    (state: AppState) => state.userData.media
  );

  // Create draft versions of objects to persist on save.
  const [draftMediaMap, setDraftMediaMap] = React.useState<MediaMap>({});
  const [draftMediaLocationMap, setDraftMediaLocationMap] = React.useState<
    MediaLocationMap
  >({});

  // Append the draft objects to the persisted objects
  const mergedMediaMap = { ...mediaMap, ...draftMediaMap };
  const mergedMediaLocations = {
    ...mediaLocationMap,
    ...draftMediaLocationMap
  };

  const media = mergedMediaMap[match.params.id];

  useEffect(() => {
    if (!media) {
      dispatch(mediaActions.fetchMedia());
    }
  }, []);

  // Reset the draft locations when switching between media to
  // avoid double saving locations
  if (mediaIdRef.current !== match.params.id) {
    setDraftMediaLocationMap({});
  }
  mediaIdRef.current = match.params.id;

  return (
    <>
      {fetchLoading && <LoadingSpinner />}
      {media && (
        <EditMedia
          {...{
            media,
            mediaMap: mergedMediaMap,
            mediaLocationMap: mergedMediaLocations,
            draftMediaLocationMap,
            setMediaMap: map => {
              setDraftMediaMap(map);
            },
            setMediaLocationMap: setDraftMediaLocationMap,
            mediaOrder
          }}
        />
      )}
    </>
  );
};

export default EditMediaContainer;
