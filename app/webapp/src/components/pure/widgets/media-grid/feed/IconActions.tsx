import React, { FunctionComponent } from "react";
import * as Widget from "~/rgb-commons/types/widgets";
import { createStyles, makeStyles, Theme, Tooltip } from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import { useHistory } from "react-router-dom";
import ViewTagsDropdown from "./ViewTagsDropdown";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "right",
      margin: "auto"
    },
    icon: {
      cursor: "pointer",
      marginLeft: theme.spacing(1)
    }
  })
);

const IconActions: FunctionComponent<{
  photo: Widget.MediaGrid.RequiredMediaConfig;
  width: number;
}> = ({ width, photo }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ width }}>
      <ViewTagsDropdown className={classes.icon} photo={photo} />
      <Tooltip title="View on map">
        <RoomIcon
          fontSize="large"
          className={classes.icon}
          onClick={() => history.push(`/media/map?activeMediaId=${photo.id}`)}
        />
      </Tooltip>
    </div>
  );
};

export default IconActions;
