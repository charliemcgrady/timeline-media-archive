import React, { FunctionComponent } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import BurstModeIcon from "@material-ui/icons/BurstMode";
import ThreeDRotationIcon from "@material-ui/icons/ThreeDRotation";
import { WidgetType } from "~/rgb-commons/types/widgets";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getDefaultData } from "./widgetData";

interface Props extends RouteComponentProps {
  story: StoryConfig;
  setStory: (story: StoryConfig) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      margin: theme.spacing(2),
      position: "fixed",
      bottom: 0,
      right: 0,
      "&.MuiSpeedDial-directionUp": {
        bottom: theme.spacing(2),
        right: theme.spacing(2)
      }
    }
  })
);

const actions = [
  { icon: <TextFormatIcon />, name: "Text", type: WidgetType.Text },
  { icon: <BurstModeIcon />, name: "Photo Grid", type: WidgetType.MediaGrid },
  {
    icon: <ThreeDRotationIcon />,
    name: "Virtual Reality",
    type: WidgetType.VirtualReality
  }
];

const AddWidget: FunctionComponent<Props> = ({ story, setStory, history }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const addWidget = (type: WidgetType) => {
    const newWidget = getDefaultData(type);

    if (newWidget) {
      const newStory = Object.assign(
        {},
        {
          ...story,
          widgets: story.widgets.concat([newWidget])
        }
      );
      setStory(newStory);
      history.push(`/profile/stories/${story.id}/${newWidget.id}`);
    }

    setOpen(false);
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      className={classes.speedDial}
      icon={<SpeedDialIcon />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      direction="up"
    >
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => addWidget(action.type)}
        />
      ))}
    </SpeedDial>
  );
};

export default withRouter(AddWidget);
