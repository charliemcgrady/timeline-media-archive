import React, { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { mediaActions, storiesActions } from "~/redux/actions";
import LoadingSpinner from "../pure/affordances/LoadingSpinner";
import ViewMedia from "./view/as-feed/ViewMediaAsFeed";
import ViewMediaAsMap from "./view/as-map/ViewMediaAsMap";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import { useIsViewingMap } from "./useIsViewingMap";

const ViewMediaContainer: FunctionComponent<{}> = ({}) => {
  const dispatch = useDispatch();

  const { setAppliedFilter } = useAppliedFilter();

  const isViewingMap = useIsViewingMap();

  const appState = useSelector((state: AppState) => state);
  const { fetchLoading: fetchMediaLoading } = appState.userData.media;
  const { fetchLoading: fetchStoriesLoading } = appState.userData.stories;

  const fetchMediaLoadingRef = useRef(fetchMediaLoading);

  useEffect(() => {
    dispatch(mediaActions.fetchMedia());
    dispatch(storiesActions.fetchStories());
  }, []);

  // Once media has loaded, update the media filter to calculate which media to show
  useEffect(() => {
    if (fetchMediaLoadingRef.current && !fetchMediaLoading) {
      setAppliedFilter(appState.mediaFilter.appliedFilter);
    }
    fetchMediaLoadingRef.current = fetchMediaLoading;
  });

  return (
    <>
      {fetchMediaLoading || (fetchStoriesLoading && <LoadingSpinner />)}
      {!fetchMediaLoading && !fetchStoriesLoading && (
        <>{isViewingMap ? <ViewMediaAsMap /> : <ViewMedia />}</>
      )}
    </>
  );
};

export default ViewMediaContainer;
