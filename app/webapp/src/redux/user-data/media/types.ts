import { Media, MediaMap, MediaLocationMap } from "~/rgb-commons/types/media";
import { GetMediaResponse } from "~/rgb-commons/types/api";

export const FETCH_MEDIA_PENDING = "FETCH_MEDIA_PENDING";
export const FETCH_MEDIA_SUCCESS = "FETCH_MEDIA_SUCCESS";
export const FETCH_MEDIA_ERROR = "FETCH_MEDIA_ERROR";
export const SAVE_MEDIA_PENDING = "SAVE_MEDIA_PENDING";
export const SAVE_MEDIA_SUCCESS = "SAVE_MEDIA_SUCCESS";
export const SAVE_MEDIA_ERROR = "SAVE_MEDIA_ERROR";

export type MediaState = {
  mediaMap: MediaMap;
  mediaLocationMap: MediaLocationMap;
  mediaOrder: Array<string>;
  fetchLoading: boolean;
  fetchError: string;
  saveLoading: boolean;
  saveError: string;
};

interface FetchMediaPending {
  type: typeof FETCH_MEDIA_PENDING;
  payload: {};
}

interface FetchMediaSuccess {
  type: typeof FETCH_MEDIA_SUCCESS;
  payload: GetMediaResponse;
}

interface FetchMediaError {
  type: typeof FETCH_MEDIA_ERROR;
  payload: {
    error: string;
  };
}

interface SaveMediaPending {
  type: typeof SAVE_MEDIA_PENDING;
  payload: {};
}

interface SaveMediaSuccess {
  type: typeof SAVE_MEDIA_SUCCESS;
  payload: {
    media: Media;
    locations: MediaLocationMap;
  };
}

interface SaveMediaError {
  type: typeof SAVE_MEDIA_ERROR;
  payload: {
    error: string;
  };
}

export type MediaActionTypes =
  | FetchMediaPending
  | FetchMediaSuccess
  | FetchMediaError
  | SaveMediaPending
  | SaveMediaSuccess
  | SaveMediaError;
