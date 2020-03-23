import React from "react";
import { Fab, createStyles, makeStyles, Theme } from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(2),
      position: "fixed",
      bottom: 0,
      right: 0,
      zIndex: 1000,
      "& .MuiSvgIcon-root": {
        fontSize: 30
      }
    }
  })
);

const LocationFilterFab: React.FunctionComponent<{
  viewingMap: boolean;
  setViewingMap: (value: boolean) => void;
}> = ({ setViewingMap, viewingMap }) => {
  const classes = useStyles();
  return (
    <Fab className={classes.fab} onClick={() => setViewingMap(!viewingMap)}>
      <RoomIcon />
    </Fab>
  );
};

export default LocationFilterFab;
