import {
  MediaFilterState,
  MediaFilterActionTypes,
  RESET_MEDIA_FILTER,
  UPDATE_MEDIA_FILTER
} from "./types";
import { filterMedia } from "./filterMedia";

export default (
  state = {
    mediaIds: {
      unfiltered: [],
      filtered: {
        byTime: [],
        byLocation: [],
        byRating: []
      },
      eligible: []
    },
    appliedFilter: {}
  } as MediaFilterState,
  action: MediaFilterActionTypes
): MediaFilterState => {
  switch (action.type) {
    case UPDATE_MEDIA_FILTER: {
      const appliedFilter = {
        ...state.appliedFilter,
        ...action.payload.filter
      };
      return {
        ...state,
        mediaIds: filterMedia(
          action.payload.mediaState.mediaOrder,
          appliedFilter,
          action.payload.mediaState.mediaMap,
          action.payload.mediaState.mediaLocationMap
        ),
        appliedFilter
      };
    }
    case RESET_MEDIA_FILTER: {
      return {
        ...state,
        mediaIds: filterMedia(
          action.payload.mediaState.mediaOrder,
          {},
          action.payload.mediaState.mediaMap,
          action.payload.mediaState.mediaLocationMap
        ),
        appliedFilter: {}
      };
    }
    default:
      return state;
  }
};
