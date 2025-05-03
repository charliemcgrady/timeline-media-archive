import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { mediaActions, storiesActions } from "~/redux/actions";
import LoadingSpinner from "../pure/affordances/LoadingSpinner";
import MediaFeed from "./view/feed/MediaFeed";
import BrowseMediaView from "./view/browser/MediaBrowser";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import { useMediaView } from "./useMediaView";
import { ViewType } from "./view-type";

const ViewMediaContainer: FunctionComponent<{}> = ({}) => {
  const dispatch = useDispatch();

  const { setAppliedFilter } = useAppliedFilter();

  const viewType = useMediaView();

  const appState = useSelector((state: AppState) => state);
  const { fetchLoading: fetchMediaLoading, mediaMap } = appState.userData.media;
  const {
    fetchLoading: fetchStoriesLoading,
    stories
  } = appState.userData.stories;

  useEffect(() => {
    if (Object.keys(mediaMap).length === 0) {
      dispatch(mediaActions.fetchMedia());
    }

    if (Object.keys(stories).length === 0) {
      dispatch(storiesActions.fetchStories());
    }
  }, []);

  // Once media has loaded, update the media filter to calculate which media to show
  useEffect(() => {
    setAppliedFilter(appState.mediaFilter.appliedFilter);
  }, []);

  return (
    <>
      {fetchMediaLoading || fetchStoriesLoading ? <LoadingSpinner /> : <></>}
      {!fetchMediaLoading && !fetchStoriesLoading && (
        <>
          <>
            {viewType.toString() === ViewType.BROWSER.toString() && (
              <BrowseMediaView />
            )}
          </>
          <>
            {viewType.toString() === ViewType.FEED.toString() && <MediaFeed />}
          </>
        </>
      )}
    </>
  );
};

export default ViewMediaContainer;
