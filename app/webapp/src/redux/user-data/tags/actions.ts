import { Dispatch } from "react";
import {
  FETCH_TAGS_PENDING,
  FETCH_TAGS_ERROR,
  FETCH_TAGS_SUCCESS,
  SYNC_TAGS_PENDING,
  SYNC_TAGS_ERROR,
  SYNC_TAGS_SUCCESS,
  UPDATE_PENDING_SYNC,
  PendingSync
} from "./types";
import { GetTagsResponse } from "~/rgb-commons/types/api";
import store from "~/redux/store";

export const fetchPending = () => {
  return {
    type: FETCH_TAGS_PENDING,
    payload: {}
  };
};

export const fetchError = () => {
  return {
    type: FETCH_TAGS_ERROR,
    payload: {}
  };
};

export const fetchTagsSuccess = (response: GetTagsResponse) => {
  return {
    type: FETCH_TAGS_SUCCESS,
    payload: response
  };
};

export const syncPending = () => {
  return {
    type: SYNC_TAGS_PENDING,
    payload: {}
  };
};

export const syncError = () => {
  return {
    type: SYNC_TAGS_ERROR,
    payload: {}
  };
};

export const syncSuccess = (response: GetTagsResponse) => {
  return {
    type: SYNC_TAGS_SUCCESS,
    payload: response
  };
};

export const updatePendingSync = (pendingSync: PendingSync) => {
  return {
    type: UPDATE_PENDING_SYNC,
    payload: pendingSync
  };
};

export const fetchTags = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchPending());
    fetch(`/api/tags`)
      .then(response => response.json())
      .then(response => {
        dispatch(fetchTagsSuccess(response));
      })
      .catch(error => {
        dispatch(fetchError());
      });
  };
};

export const syncTags = (request: PendingSync) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(syncPending());
    fetch(`/api/tags`, {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
        Password: store.getState().authentication.password
      }
    })
      .then(response => response.json())
      .then(response => {
        dispatch(syncSuccess(response));
      })
      .catch(error => {
        dispatch(syncError());
      });
  };
};
