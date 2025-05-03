import React, { FunctionComponent } from "react";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import * as Uppy from "@uppy/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uppy: {
      padding: theme.spacing(2),
      height: window.innerHeight,
      width: window.innerWidth,
      backgroundColor: theme.palette.background.paper,
      "& .uppy-Dashboard-inner": {
        border: "1px solid #AAA",
        backgroundColor: "#EEE",
        margin: "auto",
        "& .uppy-DashboardItem": {
          borderBottom: "1px solid #CCC"
        }
      }
    }
  })
);

interface Props {
  uppy: Uppy.Uppy;
}

const UppyWrapper: FunctionComponent<Props> = ({ uppy }) => {
  const classes = useStyles();

  return (
    <div className={classes.uppy}>
      <Dashboard uppy={uppy} />
    </div>
  );
};

export default UppyWrapper;
