import React, { FunctionComponent } from "react";
import { WidgetConfig } from "~/rgb-commons/types/widgets";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import EditMediaGridMetadata from "./EditMediaGridAppearance";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  createStyles
} from "@material-ui/core";
import PhotoSizeSelectLargeIcon from "@material-ui/icons/PhotoSizeSelectLarge";
import AppsIcon from "@material-ui/icons/Apps";
import BurstModeIcon from "@material-ui/icons/BurstMode";
import EditMediaGridItems from "./EditMediaGridItems";
import EditMediaGridOrder from "./EditMediaGridOrder";

interface Props {
  story: StoryConfig;
  widget: WidgetConfig;
  setWidget: (widget: WidgetConfig) => void;
  setStory: (story: StoryConfig) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      position: "fixed",
      bottom: 0,
      width: "100%"
    }
  })
);

const EditMediaGrid: FunctionComponent<Props> = ({
  widget,
  setWidget,
  story,
  setStory
}) => {
  const [value, setValue] = React.useState(2);

  const classes = useStyles();

  return (
    <>
      <div style={{ display: value === 0 ? "inline" : "none" }}>
        <EditMediaGridMetadata {...{ widget, setWidget, story }} />
      </div>
      <div style={{ display: value === 1 ? "inline" : "none" }}>
        <EditMediaGridOrder {...{ widget, setWidget, story }} />
      </div>
      <div style={{ display: value === 2 ? "inline" : "none" }}>
        <EditMediaGridItems {...{ widget, setWidget, story, setStory }} />
      </div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.footer}
      >
        <BottomNavigationAction
          label="Appearance"
          icon={<PhotoSizeSelectLargeIcon />}
        />
        <BottomNavigationAction label="Order" icon={<AppsIcon />} />
        <BottomNavigationAction label="Media" icon={<BurstModeIcon />} />
      </BottomNavigation>
    </>
  );
};

export default EditMediaGrid;
