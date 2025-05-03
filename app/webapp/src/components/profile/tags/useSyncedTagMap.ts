import { useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { TagMap } from "~/rgb-commons/types/tags";

export const useSyncedTagMap = () => {
  const { pendingSync, tagMap } = useSelector(
    (state: AppState) => state.userData.tags
  );

  // Deep copy to avoid inadvertant mutation of tagMap
  const tagMapAfterSync: TagMap = JSON.parse(JSON.stringify(tagMap));

  pendingSync.tagsToAddOrUpdate.forEach(tag => {
    tagMapAfterSync[tag.id] = {
      ...tag,
      mediaIds: tagMapAfterSync[tag.id] ? tagMapAfterSync[tag.id].mediaIds : []
    };
  });
  pendingSync.tagsToDelete.forEach(tag => {
    delete tagMapAfterSync[tag.id];
  });
  pendingSync.tagEdgesToAddOrUpdate.forEach(edge => {
    if (!tagMapAfterSync[edge.tagId].mediaIds.includes(edge.mediaId)) {
      tagMapAfterSync[edge.tagId].mediaIds.push(edge.mediaId);
    }
  });
  pendingSync.tagEdgesToDelete.forEach(edge => {
    if (tagMapAfterSync[edge.tagId].mediaIds.includes(edge.mediaId)) {
      tagMapAfterSync[edge.tagId].mediaIds = tagMapAfterSync[
        edge.tagId
      ].mediaIds.filter(mediaId => mediaId !== edge.mediaId);
    }
  });

  return tagMapAfterSync;
};
