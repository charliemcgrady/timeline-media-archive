import { TagMap } from "~/rgb-commons/types/tags";

export const getInitialState = () => {
  const bootstrappedTagMap = ((<any>window).tagMap as TagMap) || ({} as TagMap);
  const mediaIdToTagIds = {};
  Object.keys(bootstrappedTagMap).forEach(tagId => {
    bootstrappedTagMap[tagId].mediaIds.forEach(mediaId => {
      if (!mediaIdToTagIds[mediaId]) {
        mediaIdToTagIds[mediaId] = [tagId];
      } else {
        mediaIdToTagIds[mediaId] = [...mediaIdToTagIds[mediaId], [tagId]];
      }
    });
  });

  return { bootstrappedTagMap, mediaIdToTagIds };
};
