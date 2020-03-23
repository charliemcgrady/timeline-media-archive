import React, { FunctionComponent } from "react";
import WidgetRenderer from "~/components/pure/renderers/WidgetRenderer";
import { WidgetConfig, WidgetType } from "~/rgb-commons/types/widgets";
import { useTheme } from "@material-ui/core/styles";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import { Draggable } from "react-beautiful-dnd";
import EditStoryWidgetPanel from "./EditStoryWidgetPanel";

interface Props {
  widget: WidgetConfig;
  story: StoryConfig;
  setStory: (story: StoryConfig) => void;
  index: number;
}

const EditStorySection: FunctionComponent<Props> = ({
  widget,
  story,
  setStory,
  index
}) => {
  const theme = useTheme();

  // Limit the size of widgets so we can apply padding / breakpoints for the story panels
  const maxWidgetWidth = Math.min(
    theme.breakpoints.width("md") - 4 * theme.spacing(3),
    window.innerWidth - 5 * theme.spacing(3)
  );

  if (widget.type === WidgetType.MediaGrid) {
    widget = {
      ...widget,
      metadata: {
        ...widget.metadata,
        ...{
          containerWidth: maxWidgetWidth,
          containerPadding: { left: 0, right: 0, top: 20, bottom: 20 },
          makePhotosFullHeight: false
        }
      }
    };
  } else if (widget.type === WidgetType.VirtualReality) {
    widget = {
      ...widget,
      metadata: {
        ...widget.metadata,
        ...{
          width: maxWidgetWidth,
          height: 400
        }
      }
    };
  }

  return (
    <Draggable key={widget.id} draggableId={widget.id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <EditStoryWidgetPanel {...{ story, setStory, widget }}>
            <WidgetRenderer
              {...{
                widget,
                media: story.media
              }}
            />
          </EditStoryWidgetPanel>
        </div>
      )}
    </Draggable>
  );
};

export default EditStorySection;
