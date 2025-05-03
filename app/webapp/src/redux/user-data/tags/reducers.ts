import {
  TagActionTypes,
  TagState,
  PendingSync,
  FETCH_TAGS_PENDING,
  FETCH_TAGS_ERROR,
  FETCH_TAGS_SUCCESS,
  SYNC_TAGS_PENDING,
  SYNC_TAGS_ERROR,
  SYNC_TAGS_SUCCESS,
  UPDATE_PENDING_SYNC
} from "./types";
import { TagEdge } from "~/rgb-commons/types/tags";
import { getInitialState } from "./getInitialState";

const { bootstrappedTagMap, mediaIdToTagIds } = getInitialState();

export default (
  state = {
    tagMap: bootstrappedTagMap,
    mediaIdToTagIds: mediaIdToTagIds,
    tagEdges: [] as Array<TagEdge>,
    fetchLoading: false,
    fetchError: false,
    pendingSync: {
      tagsToDelete: [],
      tagsToAddOrUpdate: [],
      tagEdgesToDelete: [],
      tagEdgesToAddOrUpdate: []
    } as PendingSync,
    syncLoading: false,
    syncError: false
  } as TagState,
  action: TagActionTypes
): TagState => {
  switch (action.type) {
    case FETCH_TAGS_PENDING: {
      return {
        ...state,
        fetchError: false,
        fetchLoading: true
      };
    }
    case FETCH_TAGS_ERROR: {
      return {
        ...state,
        fetchError: true,
        fetchLoading: false
      };
    }
    case FETCH_TAGS_SUCCESS: {
      return {
        ...state,
        tagEdges: action.payload.tagEdges,
        tagMap: action.payload.tagMap,
        fetchLoading: false,
        fetchError: false
      };
    }
    case SYNC_TAGS_PENDING: {
      return {
        ...state,
        syncError: false,
        syncLoading: true
      };
    }
    case SYNC_TAGS_ERROR: {
      return {
        ...state,
        syncError: true,
        syncLoading: false
      };
    }
    case SYNC_TAGS_SUCCESS: {
      return {
        ...state,
        tagEdges: action.payload.tagEdges,
        tagMap: action.payload.tagMap,
        pendingSync: {
          tagsToDelete: [],
          tagsToAddOrUpdate: [],
          tagEdgesToDelete: [],
          tagEdgesToAddOrUpdate: []
        },
        syncLoading: false,
        syncError: false
      };
    }
    case UPDATE_PENDING_SYNC: {
      return {
        ...state,
        pendingSync: action.payload
      };
    }
    default:
      return state;
  }
};
