import React, { FunctionComponent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface Props {
  title?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    backButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    appBar: {
      backgroundColor: "black"
    },
    stickSubNav: {
      marginTop: 100
    }
  })
);

const NavBar: FunctionComponent<Props> = ({
  children,
  title = "",
  leftSlot,
  rightSlot
}) => {
  const classes = useStyles();

  const trigger = useScrollTrigger();

  return (
    <>
      <CssBaseline />
      <Slide appear={false} direction="down" in={!trigger}>
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar variant="dense">
              {leftSlot}
              <Typography variant="subtitle1" className={classes.title}>
                {title}
              </Typography>
              {rightSlot}
            </Toolbar>
          </AppBar>
        </div>
      </Slide>
      <Toolbar variant="dense" />
      {children}
    </>
  );
};

export default NavBar;
