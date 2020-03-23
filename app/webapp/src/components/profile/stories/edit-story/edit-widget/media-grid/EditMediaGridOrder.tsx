import React, { FunctionComponent } from "react";
import { WidgetConfig } from "~/rgb-commons/types/widgets";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import { Size, buildImageUrl } from "~/util/mediaUrls";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import arrayMove from "array-move";

interface Props {
  story: StoryConfig;
  widget: WidgetConfig;
  setWidget: (widget: WidgetConfig) => void;
}

const EditMediaGridOrder: FunctionComponent<Props> = ({
  story,
  widget,
  setWidget
}) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    setWidget({
      ...widget,
      media: arrayMove(
        widget.media!,
        result.source.index,
        result.destination.index
      )
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="rgb-reorder-media-grid">
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ textAlign: "center" }}
          >
            {widget.media!.map((media, i) => (
              <Draggable key={media.id} draggableId={media.id} index={i}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <img
                      style={{
                        width: 100,
                        marginTop: 20
                      }}
                      src={buildImageUrl(story.media[media.id].id, Size.Small)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default EditMediaGridOrder;
