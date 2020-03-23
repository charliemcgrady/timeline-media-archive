import React, { FunctionComponent } from "react";
import { WidgetConfig, WidgetType } from "~/rgb-commons/types/widgets";
import EditTextWidget from "./text/EditTextWidget";
import EditMediaGrid from "./media-grid/EditMediaGrid";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import EditWidgetNavBar from "./EditWidgetNavBar";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import EditVirtualReality from "./virtual-reality/EditVirtualReality";

interface Props {
  widget: WidgetConfig;
  setWidget: (widget: WidgetConfig | undefined) => void;
  story: StoryConfig;
  setStory: (story: StoryConfig) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(10)
    }
  })
);

const EditWidget: FunctionComponent<Props> = ({
  widget,
  setWidget,
  story,
  setStory
}) => {
  const classes = useStyles();

  const editProps = { widget, setWidget, story, setStory };
  let editWidget = <span />;
  if (widget.type === WidgetType.Text) {
    editWidget = <EditTextWidget {...editProps} />;
  } else if (widget.type === WidgetType.MediaGrid) {
    editWidget = <EditMediaGrid {...editProps} />;
  } else if (widget.type === WidgetType.VirtualReality) {
    editWidget = <EditVirtualReality {...editProps} />;
  }

  return (
    <EditWidgetNavBar {...{ widget, setWidget, story, setStory }}>
      <div className={classes.root}>{editWidget}</div>
    </EditWidgetNavBar>
  );
};

export default EditWidget;
