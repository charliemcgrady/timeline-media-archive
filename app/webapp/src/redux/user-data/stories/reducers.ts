import {
  FETCH_PENDING,
  FETCH_STORY_SUCCESS,
  FETCH_STORIES_SUCCESS,
  FETCH_ERROR,
  SAVE_PENDING,
  SAVE_SUCCESS,
  SAVE_ERROR,
  SET_STORY_DRAFT,
  StoriesState,
  StoriesActionTypes
} from "./types";

export default (
  state = {
    stories: {},
    storyDrafts: {},
    fetchLoading: false,
    saveLoading: false
  },
  action: StoriesActionTypes
): StoriesState => {
  switch (action.type) {
    case FETCH_PENDING: {
      return {
        ...state,
        fetchError: undefined,
        fetchLoading: true
      };
    }
    case SAVE_PENDING: {
      return {
        ...state,
        saveError: undefined,
        saveLoading: true
      };
    }
    case FETCH_STORY_SUCCESS: {
      return {
        ...state,
        fetchLoading: false,
        fetchError: undefined,
        stories: {
          ...state.stories,
          [action.payload.id]: action.payload
        }
      };
    }
    case FETCH_STORIES_SUCCESS: {
      return {
        ...state,
        fetchLoading: false,
        fetchError: undefined,
        stories: {
          ...state.stories,
          ...action.payload
        }
      };
    }
    case SAVE_SUCCESS: {
      return {
        ...state,
        saveLoading: false,
        saveError: undefined,
        stories: {
          ...state.stories,
          [action.payload.id]: action.payload
        }
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        fetchLoading: false,
        fetchError: action.payload.error
      };
    }
    case SAVE_ERROR: {
      return {
        ...state,
        saveLoading: false,
        saveError: action.payload.error
      };
    }
    case SET_STORY_DRAFT: {
      return {
        ...state,
        storyDrafts: {
          ...state.storyDrafts,
          [action.payload.id]: action.payload
        }
      };      
    }
    default:
      return state;
  }
}
