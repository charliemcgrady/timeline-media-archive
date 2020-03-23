import {
  FETCH_MEDIA_PENDING,
  FETCH_MEDIA_ERROR,
  FETCH_MEDIA_SUCCESS,
  SAVE_MEDIA_PENDING,
  SAVE_MEDIA_ERROR,
  SAVE_MEDIA_SUCCESS
} from "./types";
import { Dispatch } from "redux";
import { GetMediaResponse, SaveMediaRequest } from "~/rgb-commons/types/api";
import { Media, MediaLocationMap } from "~/rgb-commons/types/media";

export const fetchMediaPending = () => {
  return {
    type: FETCH_MEDIA_PENDING,
    payload: {}
  };
};

export const fetchMediaSuccess = (media: GetMediaResponse) => {
  return {
    type: FETCH_MEDIA_SUCCESS,
    payload: media
  };
};

export const fetchMediaError = (error: string) => {
  return {
    type: FETCH_MEDIA_ERROR,
    payload: { error }
  };
};

export const saveMediaPending = () => {
  return {
    type: SAVE_MEDIA_PENDING,
    payload: {}
  };
};

export const saveMediaSuccess = (media: Media, locations: MediaLocationMap) => {
  return {
    type: SAVE_MEDIA_SUCCESS,
    payload: { media, locations }
  };
};

export const saveMediaError = (error: string) => {
  return {
    type: SAVE_MEDIA_ERROR,
    payload: { error }
  };
};

export const fetchMedia = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchMediaPending());
    fetch("/api/media")
      .then(response => response.json())
      .then((response: GetMediaResponse) => {
        dispatch(fetchMediaSuccess(response));
        return response;
      })
      .catch(error => {
        dispatch(fetchMediaError(error));
      });
  };
};

export const saveMedia = (media: Media, locations: MediaLocationMap) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(saveMediaPending());
    fetch(`/api/media/${media.id}`, {
      method: "PUT",
      body: JSON.stringify({
        media,
        locations: Object.keys(locations).map(id => locations[id])
      } as SaveMediaRequest),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        dispatch(saveMediaSuccess(media, locations));
        return response;
      })
      .catch(error => {
        dispatch(saveMediaError(error));
      });
  };
};
