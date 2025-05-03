import React, { FunctionComponent } from "react";
import MediaGrid from "~/components/pure/widgets/media-grid/MediaGrid";
import { AppState } from "~/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { tagActions } from "~/redux/actions";
import { TagEdge, TagMap } from "~/rgb-commons/types/tags";
import { generateTagEdgeId } from "~/rgb-commons/uuidFactory";

const SelectMediaForTag: FunctionComponent<{
  tagMap: TagMap;
  activeTagId: string | undefined;
}> = ({ activeTagId, tagMap }) => {
  const dispatch = useDispatch();
  const { media: mediaState, tags: tagState } = useSelector(
    (state: AppState) => state.userData
  );

  const onMediaClicked = (mediaId: string) => {
    if (!activeTagId) {
      return;
    }

    let tagEdge: TagEdge | undefined;
    // See if the edge is already persisted in the db
    tagState.tagEdges.forEach(edge => {
      if (edge.mediaId === mediaId && edge.tagId === activeTagId) {
        tagEdge = edge;
      }
    });

    // If the media needs to be removed from the tag
    if (tagMap[activeTagId].mediaIds.includes(mediaId)) {
      dispatch(
        tagActions.updatePendingSync({
          ...tagState.pendingSync,
          // If the edge is persisted in the DB, mark it to be deleted
          tagEdgesToDelete: [
            ...tagState.pendingSync.tagEdgesToDelete,
            ...(tagEdge ? [tagEdge] : [])
          ],
          // Make sure the edge will not be persisted in the tag
          tagEdgesToAddOrUpdate: tagState.pendingSync.tagEdgesToAddOrUpdate.filter(
            edge => edge.mediaId !== mediaId || edge.tagId !== activeTagId
          )
        })
      );
      // If the media needs to be added to the tag
    } else {
      // If the edge does not exist in the db
      if (!tagEdge) {
        // Create a new tag edge
        tagEdge = {
          id: generateTagEdgeId(),
          mediaId,
          tagId: activeTagId
        };

        dispatch(
          tagActions.updatePendingSync({
            ...tagState.pendingSync,
            // Remove the edge from the tag edges to delete
            tagEdgesToDelete: tagState.pendingSync.tagEdgesToDelete.filter(
              edge => edge.id !== tagEdge!.id
            ),
            // Mark the edge as to be added to the tag
            tagEdgesToAddOrUpdate: [
              ...tagState.pendingSync.tagEdgesToAddOrUpdate,
              ...[tagEdge]
            ]
          })
        );
      } else {
        // If the edge already exists in the db
        dispatch(
          tagActions.updatePendingSync({
            ...tagState.pendingSync,
            // Remove the edge from the tag edges to delete
            tagEdgesToDelete: tagState.pendingSync.tagEdgesToDelete.filter(
              edge => edge.id !== tagEdge!.id
            )
          })
        );
      }
    }
  };

  return (
    <>
      {activeTagId && (
        <MediaGrid
          media={mediaState.mediaOrder.map(id => mediaState.mediaMap[id])}
          disabledMediaIds={tagMap[activeTagId].mediaIds}
          metadata={{ targetRowHeight: 75 }}
          onMediaClicked={onMediaClicked}
        />
      )}
    </>
  );
};

export default SelectMediaForTag;
