import { TagMap, TagEdge, Tag } from "~/rgb-commons/types/tags";
import { GetTagsResponse } from "~/rgb-commons/types/api";

export const FETCH_TAGS_PENDING = "FETCH_TAGS_PENDING";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_ERROR = "FETCH_TAGS_ERROR";
export const UPDATE_PENDING_SYNC = "UPDATE_PENDING_SYNC";
export const SYNC_TAGS_PENDING = "SYNC_TAGS_PENDING";
export const SYNC_TAGS_SUCCESS = "SYNC_TAGS_SUCCESS";
export const SYNC_TAGS_ERROR = "SYNC_TAGS_ERROR";

export type PendingSync = {
  tagsToDelete: Array<Tag>;
  tagsToAddOrUpdate: Array<Tag>;
  tagEdgesToDelete: Array<TagEdge>;
  tagEdgesToAddOrUpdate: Array<TagEdge>;
};

export type TagState = {
  tagMap: TagMap;
  mediaIdToTagIds: { [mediaId: string]: Array<string> };
  tagEdges: Array<TagEdge>;
  fetchLoading: boolean;
  fetchError: boolean;
  pendingSync: PendingSync;
  syncLoading: boolean;
  syncError: boolean;
};

interface FetchTagsPending {
  type: typeof FETCH_TAGS_PENDING;
  payload: {};
}

interface FetchTagsSuccess {
  type: typeof FETCH_TAGS_SUCCESS;
  payload: GetTagsResponse;
}

interface FetchTagsError {
  type: typeof FETCH_TAGS_ERROR;
  payload: {};
}

interface UpdatePendingSync {
  type: typeof UPDATE_PENDING_SYNC;
  payload: PendingSync;
}

interface SyncPending {
  type: typeof SYNC_TAGS_PENDING;
  payload: {};
}

interface SyncSuccess {
  type: typeof SYNC_TAGS_SUCCESS;
  payload: GetTagsResponse;
}

interface SyncError {
  type: typeof SYNC_TAGS_ERROR;
  payload: {};
}

export type TagActionTypes =
  | FetchTagsPending
  | FetchTagsSuccess
  | FetchTagsError
  | UpdatePendingSync
  | SyncPending
  | SyncSuccess
  | SyncError;
