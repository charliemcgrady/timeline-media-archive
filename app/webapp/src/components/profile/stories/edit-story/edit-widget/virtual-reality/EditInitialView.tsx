import React, { FunctionComponent } from "react";
import { WidgetConfig, VirtualReality } from "~/rgb-commons/types/widgets";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import {
  Container,
  Button,
  Theme,
  createStyles,
  makeStyles
} from "@material-ui/core";
import Marzipano from "marzipano";

interface Props {
  story: StoryConfig;
  widget: WidgetConfig;
  setWidget: (widget: WidgetConfig) => void;
  setStory: (story: StoryConfig) => void;
  sceneId: string;
  view?: Marzipano.RectilinearView;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editInitialView: {
      marginBottom: theme.spacing(2),
      textAlign: "center"
    }
  })
);

const SetInitialView: FunctionComponent<Props> = ({
  story,
  widget,
  setWidget,
  setStory,
  sceneId,
  view
}) => {
  const classes = useStyles();

  const setInitialView = () => {
    if (!view) {
      return;
    }

    const metadata = widget.metadata as VirtualReality.Metadata;

    const newWidget = {
      ...widget,
      metadata: {
        ...metadata,
        scenes: metadata.scenes.map(scene => {
          if (scene.id === sceneId) {
            return {
              ...scene,
              initialViewParameters: {
                yaw: view.yaw(),
                pitch: view.pitch(),
                fov: view.fov()
              }
            };
          } else {
            return scene;
          }
        })
      }
    };

    const newStory = {
      ...story,
      widgets: story.widgets.map(w => {
        if (w.id === newWidget.id) {
          return newWidget;
        } else {
          return w;
        }
      })
    };

    setWidget(newWidget);
    setStory(newStory);
  };

  return (
    <Container className={classes.editInitialView}>
      <Button variant="outlined" color="primary" onClick={setInitialView}>
        Set initial view
      </Button>
    </Container>
  );
};

export default SetInitialView;
