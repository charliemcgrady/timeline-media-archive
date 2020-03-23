import {
  FETCH_PENDING,
  FETCH_ERROR,
  FETCH_STORY_SUCCESS,
  FETCH_STORIES_SUCCESS,
  SAVE_PENDING,
  SAVE_ERROR,
  SAVE_SUCCESS,
  SET_STORY_DRAFT
} from "./types";
import { Dispatch } from "redux";
import store from "~/redux/store";
import { SerializedStory } from "~/rgb-commons/types/api";
import { StoryConfig } from "~/rgb-commons/types/story-config";

export const fetchPending = () => {
  return {
    type: FETCH_PENDING,
    payload: {}
  };
};

export const fetchError = (error: string) => {
  return {
    type: FETCH_ERROR,
    payload: { error }
  };
};

export const fetchStorySuccess = (story: StoryConfig) => {
  return {
    type: FETCH_STORY_SUCCESS,
    payload: story
  };
};

export const fetchStoriesSuccess = (stories: {
  [storyId: string]: StoryConfig;
}) => {
  return {
    type: FETCH_STORIES_SUCCESS,
    payload: stories
  };
};

export const savePending = () => {
  return {
    type: SAVE_PENDING,
    payload: {}
  };
};

export const saveError = (error: string) => {
  return {
    type: SAVE_ERROR,
    payload: { error }
  };
};

export const saveSuccess = (story: StoryConfig) => {
  return {
    type: SAVE_SUCCESS,
    payload: story
  };
};

export const setStoryDraft = (story: StoryConfig) => {
  return {
    type: SET_STORY_DRAFT,
    payload: story
  };
};

export const fetchStory = (id: string) => {
  return (dispatch: Dispatch<any>) => {
    // Stories in the store are guaranteed to be up-to-date.
    // If the store has already been loaded, skip the API request.
    const state = store.getState().userData.stories;
    const cachedStory = state.storyDrafts[id] || state.stories[id];
    if (cachedStory) {
      dispatch(fetchStorySuccess(cachedStory));
      return;
    }

    dispatch(fetchPending());
    fetch(`/api/stories/${id}`)
      .then(response => response.json())
      .then(response => {
        const story = new SerializedStory(response, id);
        dispatch(fetchStorySuccess(story.getConfig()));
        return response;
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
};

export const fetchStories = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchPending());
    fetch(`/api/stories/`)
      .then(response => response.json())
      .then(response => {
        const stories = {};
        response.map((story: any) => {
          story = new SerializedStory(story, story.id);
          stories[story.getConfig().id] = story.getConfig();
        });
        dispatch(fetchStoriesSuccess(stories));
        return response;
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
};

export const saveStory = (story: StoryConfig) => {
  // Media is added during runtime to make stories self-contained.
  // Since it's not persisted with the story, remove from to object
  // sent over the wire to save on bandwidth.
  const savedStory = Object.assign({}, story);
  delete savedStory.media;

  return (dispatch: Dispatch<any>) => {
    dispatch(savePending());
    fetch(`/api/stories/${story.id}`, {
      method: "PUT",
      body: JSON.stringify(savedStory),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(response => {
        dispatch(saveSuccess(story));
        return response;
      })
      .catch(error => {
        dispatch(saveError(error));
      });
  };
};
