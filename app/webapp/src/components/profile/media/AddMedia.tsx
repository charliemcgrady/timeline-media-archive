import React, { FunctionComponent } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PhotoIcon from "@material-ui/icons/Photo";
import ThreeDRotationIcon from "@material-ui/icons/ThreeDRotation";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { MediaType } from "~/rgb-commons/types/media";
import AddMediaNavBar from "./nav/AddMediaNavBar";

interface Props extends RouteComponentProps<{ mediaType: MediaType }> {}

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
  { icon: <PhotoIcon />, name: "Photo", type: MediaType.PHOTO },
  {
    icon: <ThreeDRotationIcon />,
    name: "Photo Sphere",
    type: MediaType.PHOTOSPHERE
  }
];

const AddMedia: FunctionComponent<Props> = ({ history, match }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  return (
    <AddMediaNavBar>
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
            onClick={() => {
              setOpen(false);
              history.push(`/profile/media/${action.type}/upload`);
            }}
          />
        ))}
      </SpeedDial>
    </AddMediaNavBar>
  );
};

export default withRouter(AddMedia);
