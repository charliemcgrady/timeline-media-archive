import React, { FunctionComponent } from "react";
import { WidgetConfig } from "~/rgb-commons/types/widgets";
import { IconButton, Button } from "@material-ui/core";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import NavBar from "~/components/pure/affordances/NavBar";
import { withRouter, RouteComponentProps } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

interface Props extends RouteComponentProps<{}> {
  widget: WidgetConfig;
  setWidget: (widget: WidgetConfig | undefined) => void;
  story: StoryConfig;
  setStory: (story: StoryConfig) => void;
}

const EditWidgetNavBar: FunctionComponent<Props> = ({
  widget,
  children,
  story,
  setStory,
  history
}) => {
  const onDone = () => {
    const newStory = Object.assign({}, story);
    newStory.widgets = story.widgets.map(w => {
      if (w.id === widget.id) {
        return widget;
      } else {
        return w;
      }
    });
    setStory(newStory);
    history.push(`/profile/stories/${story.id}`);
  };

  // Go back to story edit page without persisting the draft story
  const onCancel = () => history.push(`/profile/stories/${story.id}`);

  return (
    <NavBar
      leftSlot={
        <IconButton color="inherit" onClick={onCancel}>
          <CloseIcon />
        </IconButton>
      }
      rightSlot={
        <Button color="inherit" onClick={onDone}>
          Done
        </Button>
      }
    >
      {children}
    </NavBar>
  );
};

export default withRouter(EditWidgetNavBar);
