import {
  FETCH_MEDIA_PENDING,
  FETCH_MEDIA_SUCCESS,
  FETCH_MEDIA_ERROR,
  SAVE_MEDIA_PENDING,
  SAVE_MEDIA_SUCCESS,
  SAVE_MEDIA_ERROR,
  MediaState,
  MediaActionTypes
} from "./types";
import { MediaMap, MediaLocationMap } from "~/rgb-commons/types/media";
import { GetMediaResponse } from "~/rgb-commons/types/api";

export const defaultMediaState: MediaState = {
  mediaMap: (<any>window).media
    ? (<GetMediaResponse>(<any>window).media).mediaMap
    : ({} as MediaMap),
  mediaLocationMap: (<any>window).media
    ? (<GetMediaResponse>(<any>window).media).mediaLocationMap
    : ({} as MediaLocationMap),
  fetchLoading: false,
  saveLoading: false,
  mediaOrder: (<any>window).media
    ? (<GetMediaResponse>(<any>window).media).mediaOrder
    : [],
  fetchError: "",
  saveError: false
};

export default (
  state = defaultMediaState,
  action: MediaActionTypes
): MediaState => {
  switch (action.type) {
    case FETCH_MEDIA_PENDING: {
      return {
        ...state,
        fetchError: "",
        fetchLoading: true
      };
    }
    case FETCH_MEDIA_SUCCESS: {
      return {
        ...state,
        fetchError: "",
        fetchLoading: false,
        mediaMap: { ...state.mediaMap, ...action.payload.mediaMap } as MediaMap,
        mediaLocationMap: {
          ...state.mediaLocationMap,
          ...action.payload.mediaLocationMap
        },
        mediaOrder: action.payload.mediaOrder
      };
    }
    case FETCH_MEDIA_ERROR: {
      return {
        ...state,
        fetchLoading: false,
        fetchError: action.payload.error
      };
    }
    case SAVE_MEDIA_PENDING: {
      return {
        ...state,
        saveError: false,
        saveLoading: true
      };
    }
    case SAVE_MEDIA_SUCCESS: {
      return {
        ...state,
        saveError: false,
        mediaMap: {
          ...state.mediaMap,
          [action.payload.media.id]: action.payload.media
        },
        mediaLocationMap: {
          ...state.mediaLocationMap,
          ...action.payload.locations
        },
        saveLoading: false
      };
    }
    case SAVE_MEDIA_ERROR: {
      return {
        ...state,
        saveLoading: false,
        saveError: true
      };
    }
    default:
      return state;
  }
};
