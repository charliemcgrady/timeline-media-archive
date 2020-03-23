import { useSelector, useDispatch } from "react-redux";
import { AppState } from "~/redux/store";
import { MediaFilter } from "./types";
import { mediaFilterActions } from "../actions";
import { useLocation, useHistory } from "react-router-dom";
import { parse } from "querystring";
import { useRef } from "react";

export const useAppliedFilter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const queryParams = parse(location.search);
  const appState = useSelector((state: AppState) => state);

  const hasMappedParamsToState = useRef(false);

  const activeMediaId =
    queryParams["activeMediaId"] || queryParams["?activeMediaId"];

  if (!activeMediaId) {
    hasMappedParamsToState.current === true;
  }

  if (
    !hasMappedParamsToState.current &&
    activeMediaId &&
    appState.mediaFilter.appliedFilter.activeMediaId !== activeMediaId &&
    typeof activeMediaId === "string" &&
    appState.userData.media.mediaMap[activeMediaId]
  ) {
    hasMappedParamsToState.current = true;
    dispatch(
      mediaFilterActions.updateMediaFilter(
        { activeMediaId },
        appState.userData.media
      )
    );
  }

  return {
    appliedFilter: appState.mediaFilter.appliedFilter,
    setAppliedFilter: (filter: Partial<MediaFilter>) => {
      if (filter.activeMediaId) {
        history.push(
          `${location.pathname}?activeMediaId=${filter.activeMediaId}`
        );
      }
      dispatch(
        mediaFilterActions.updateMediaFilter(filter, appState.userData.media)
      );
    },
    resetAppliedFilter: () => {
      dispatch(mediaFilterActions.resetMediaFilter(appState.userData.media));
    },
    mediaIds: appState.mediaFilter.mediaIds
  };
};
