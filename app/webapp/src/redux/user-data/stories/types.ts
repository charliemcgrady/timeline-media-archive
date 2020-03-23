import { StoryConfig } from '~/rgb-commons/types/story-config';

export const FETCH_PENDING = "FETCH_PENDING";
export const FETCH_ERROR = "FETCH_ERROR";
export const FETCH_STORY_SUCCESS = "FETCH_STORY_SUCCESS";
export const FETCH_STORIES_SUCCESS = "FETCH_STORIES_SUCCESS";
export const SAVE_PENDING = "SAVE_PENDING";
export const SAVE_ERROR = "SAVE_ERROR";
export const SAVE_SUCCESS = "SAVE_SUCCESS";
export const SET_STORY_DRAFT = "SET_STORY_DRAFT";

export type StoriesState = {
  stories: {
    [storyId: string]: StoryConfig;
  },
  // Save drafts of stories being edited in the store so the drafts are persisted accross routes
  storyDrafts: {
    [storyId: string]: StoryConfig;
  },
  fetchLoading: boolean,
  saveLoading: boolean,
  fetchError?: string,
  saveError?: string
};

interface FetchPending {
  type: typeof FETCH_PENDING;
  payload: {};
}

interface FetchStorySuccess {
  type: typeof FETCH_STORY_SUCCESS;
  payload: StoryConfig;
}

interface FetchError {
  type: typeof FETCH_ERROR;
  payload: {
    error: string
  };
}

interface FetchStoriesSuccess {
  type: typeof FETCH_STORIES_SUCCESS;
  payload: {
    [storyId: string]: StoryConfig
  };
}

interface SavePending {
  type: typeof SAVE_PENDING;
  payload: {};
}

interface SaveSuccess {
  type: typeof SAVE_SUCCESS;
  payload: StoryConfig;
}

interface SaveError {
  type: typeof SAVE_ERROR;
  payload: {
    error: string
  };
}

interface SetStoryDraft {
  type: typeof SET_STORY_DRAFT;
  payload: StoryConfig;
}

export type StoriesActionTypes = FetchPending | FetchStorySuccess | SetStoryDraft |
  FetchError | FetchStoriesSuccess | SavePending | SaveError | SaveSuccess;
