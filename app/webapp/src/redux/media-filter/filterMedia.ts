import {
  MediaLocationMap,
  MediaMap,
  Location,
  MediaType
} from "~/rgb-commons/types/media";
import { Geometry, Polygon } from "geojson";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { MediaFilter, FilteredMediaIds } from "./types";

export const filterMedia = (
  mediaOrder: Array<string>,
  appliedFilter: MediaFilter,
  mediaMap: MediaMap,
  mediaLocationMap: MediaLocationMap
): FilteredMediaIds => {
  if (appliedFilter.activeStory) {
    const media = Object.keys(appliedFilter.activeStory.media);
    return {
      unfiltered: media,
      filtered: {
        byTime: [],
        byLocation: [],
        byRating: []
      },
      eligible: media
    };
  }

  const eligibleMediaIds = mediaOrder.filter(
    id =>
      // Reserve 1 star ratings as a way of hiding photos from the media page
      mediaMap[id].rating > 1 &&
      // Only show photos with location so map page is cooler
      mediaMap[id].locationId &&
      // Photos are currently the only supported media type
      mediaMap[id].type === MediaType.PHOTO
  );

  let mediaIds: FilteredMediaIds = {
    unfiltered: eligibleMediaIds,
    filtered: {
      byTime: [],
      byLocation: [],
      byRating: []
    },
    eligible: eligibleMediaIds
  };

  if (appliedFilter.geospatialGeometry) {
    mediaIds = filterByLocation(
      mediaIds,
      appliedFilter.geospatialGeometry,
      mediaLocationMap
    );
  }

  if (appliedFilter.rating) {
    mediaIds = filterByRating(mediaIds, appliedFilter, mediaMap);
  }

  mediaIds = filterByTime(mediaIds, appliedFilter, mediaMap);

  return mediaIds;
};

const filterByLocation = (
  mediaIds: FilteredMediaIds,
  geometry: Geometry,
  mediaLocationMap: MediaLocationMap
) => {
  const mediaToLocation: { [mediaId: string]: Array<Location> } = {};
  Object.keys(mediaLocationMap).forEach(id => {
    const mediaId = mediaLocationMap[id].mediaId;
    if (mediaToLocation[mediaId]) {
      mediaToLocation[mediaId].push(mediaLocationMap[id]);
    } else {
      mediaToLocation[mediaId] = [mediaLocationMap[id]];
    }
  });

  // Make sure to preserve media order in the unfiltered array
  const unfiltered: Array<string> = [];
  mediaIds.eligible.forEach(id => {
    let isUnfiltered = mediaIds.unfiltered.includes(id);
    if (!mediaToLocation[id]) {
      isUnfiltered = false;
      mediaIds.filtered.byLocation.push(id);
    } else {
      mediaToLocation[id].forEach(location => {
        if (
          !booleanPointInPolygon(
            [location.lng, location.lat],
            geometry as Polygon
          )
        ) {
          isUnfiltered = false;
          mediaIds.filtered.byLocation.push(id);
        }
      });
    }

    if (isUnfiltered) {
      unfiltered.push(id);
    }
  });

  return {
    ...mediaIds,
    unfiltered
  };
};

const filterByTime = (
  mediaIds: FilteredMediaIds,
  appliedFilter: MediaFilter,
  mediaMap: MediaMap
) => {
  // Make sure to preserve media order in the unfiltered array
  const unfiltered: Array<string> = [];

  mediaIds.eligible.forEach(id => {
    let isUnfiltered = mediaIds.unfiltered.includes(id);

    if (appliedFilter.endDate) {
      if (new Date(mediaMap[id].dateTaken) > appliedFilter.endDate) {
        isUnfiltered = false;
        mediaIds.filtered.byTime.push(id);
      }
    }
    if (appliedFilter.startDate) {
      if (new Date(mediaMap[id].dateTaken) < appliedFilter.startDate) {
        isUnfiltered = false;
        mediaIds.filtered.byTime.push(id);
      }
    }

    if (isUnfiltered) {
      unfiltered.push(id);
    }
  });

  return {
    ...mediaIds,
    unfiltered
  };
};

const filterByRating = (
  mediaIds: FilteredMediaIds,
  appliedFilter: MediaFilter,
  mediaMap: MediaMap
) => {
  // Make sure to preserve media order in the unfiltered array
  const unfiltered: Array<string> = [];

  mediaIds.eligible.forEach(id => {
    let isUnfiltered = mediaIds.unfiltered.includes(id);

    // We check for rating being undefined before calling this function
    if (mediaMap[id].rating < appliedFilter.rating!) {
      isUnfiltered = false;
      mediaIds.filtered.byRating.push(id);
    }

    if (isUnfiltered) {
      unfiltered.push(id);
    }
  });

  return {
    ...mediaIds,
    unfiltered
  };
};
