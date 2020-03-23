import React, { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mediaActions } from "~/redux/actions";
import LoadingSpinner from "~/components/pure/affordances/LoadingSpinner";
import { AppState } from "~/redux/store";
import MediaGrid from "~/components/pure/widgets/media-grid/MediaGrid";
import MediaSecondaryNav from "./nav/MediaSecondaryNav";
import { MediaType } from "~/rgb-commons/types/media";
import AddMedia from "./AddMedia";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<{}> {
  mediaType: MediaType;
}

const Media: FunctionComponent<Props> = ({ mediaType, history }) => {
  const dispatch = useDispatch();
  const { fetchLoading, mediaMap } = useSelector(
    (state: AppState) => state.userData.media
  );

  useEffect(() => {
    dispatch(mediaActions.fetchMedia());
  }, []);

  return (
    <>
      <MediaSecondaryNav activeType={mediaType} />
      {!fetchLoading && (
        <MediaGrid
          media={Object.keys(mediaMap)
            .map(id => mediaMap[id])
            .filter(m => m.type.toString() === mediaType.toString())}
          metadata={{ targetRowHeight: 100 }}
          onMediaClicked={(id: string) => history.push(`/profile/media/${id}`)}
        />
      )}
      <LoadingSpinner isLoading={fetchLoading} />
      <AddMedia />
    </>
  );
};

export default withRouter(Media);
