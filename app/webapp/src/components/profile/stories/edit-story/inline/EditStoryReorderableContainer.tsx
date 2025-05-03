import React, { FunctionComponent } from "react";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import arrayMove from "array-move";

interface Props {
  story: StoryConfig;
  setStory: (story: StoryConfig) => void;
}

const EditStoryReorderableContainer: FunctionComponent<Props> = ({
  story,
  setStory,
  children
}) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newWidgets = arrayMove(
      story.widgets,
      result.source.index,
      result.destination.index
    );
    setStory({
      ...story,
      widgets: newWidgets
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="rgb-reorder-widgets">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {children}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default EditStoryReorderableContainer;
