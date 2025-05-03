import React, { FunctionComponent } from "react";
import WidgetRenderer from "../pure/renderers/WidgetRenderer";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { StoryConfig } from "~/rgb-commons/types/story-config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(1)
    },
    widget: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginRight: "auto",
      marginLeft: "auto"
    }
  })
);

const ViewStory: FunctionComponent<{ story: StoryConfig }> = ({ story }) => {
  const classes = useStyles();

  return (
    <div>
      {story.widgets.map((widget, i) => (
        <div className={classes.widget} key={i}>
          <WidgetRenderer media={story.media} widget={widget} />
        </div>
      ))}
    </div>
  );
};

export default ViewStory;
