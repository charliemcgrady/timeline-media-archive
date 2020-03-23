import { RESET_MEDIA_FILTER, UPDATE_MEDIA_FILTER, MediaFilter } from "./types";
import { MediaState } from "../user-data/media/types";

export const updateMediaFilter = (
  filter: Partial<MediaFilter>,
  mediaState: MediaState
) => {
  return {
    type: UPDATE_MEDIA_FILTER,
    payload: {
      filter,
      mediaState
    }
  };
};

export const resetMediaFilter = (mediaState: MediaState) => {
  return {
    type: RESET_MEDIA_FILTER,
    payload: {
      mediaState
    }
  };
};
