import React, { FunctionComponent } from "react";
import { WidgetConfig } from "~/rgb-commons/types/widgets";
import { Button } from "@material-ui/core";
import { StoryConfig } from "~/rgb-commons/types/story-config";

interface Props {
  widget: WidgetConfig;
  story: StoryConfig;
  setStory: (story: StoryConfig) => void;
}

const DeleteWidget: FunctionComponent<Props> = ({
  widget,
  story,
  setStory
}) => {
  const deleteWidget = () => {
    const newStory = Object.assign({}, story);
    const newWidgets = story.widgets.filter(w => w.id !== widget.id);
    setStory({
      ...newStory,
      widgets: newWidgets
    });
  };

  return (
    <Button size="small" color="primary" onClick={deleteWidget}>
      Delete
    </Button>
  );
};

export default DeleteWidget;
