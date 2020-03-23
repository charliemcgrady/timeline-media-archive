import { Polygon } from "geojson";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import { MediaState } from "../user-data/media/types";

export const UPDATE_MEDIA_FILTER = "UPDATE_MEDIA_FILTER";
export const RESET_MEDIA_FILTER = "RESET_MEDIA_FILTER";

export type FilteredMediaIds = {
  unfiltered: Array<string>;
  filtered: {
    byTime: Array<string>;
    byRating: Array<string>;
    byLocation: Array<string>;
  };
  eligible: Array<string>;
};

export type MediaFilter = {
  startDate?: Date;
  endDate?: Date;
  geospatialGeometry?: Polygon;
  rating?: number;
  activeStory?: StoryConfig;
  activeMediaId?: string;
};

export type MediaFilterState = {
  appliedFilter: MediaFilter;
  mediaIds: FilteredMediaIds;
};

interface UpdateMediaFilter {
  type: typeof UPDATE_MEDIA_FILTER;
  payload: {
    filter: Partial<MediaFilterState>;
    mediaState: MediaState;
  };
}

interface ResetMediaFilter {
  type: typeof RESET_MEDIA_FILTER;
  payload: {
    mediaState: MediaState;
  };
}

export type MediaFilterActionTypes = UpdateMediaFilter | ResetMediaFilter;
