import React from "react";
import { Button, Tooltip, makeStyles, createStyles } from "@material-ui/core";
import NavBar from "~/components/pure/affordances/NavBar";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import Logo from "~/components/pure/affordances/Logo";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import RoomIcon from "@material-ui/icons/Room";

interface Props extends RouteComponentProps<{}> {}

const useStyles = makeStyles(() => {
  return createStyles({
    navButton: {
      minWidth: 50
    }
  });
});

const BrowseMediaNav: React.FunctionComponent<Props> = ({
  history,
  children
}) => {
  const { setAppliedFilter } = useAppliedFilter();
  const classes = useStyles();

  return (
    <NavBar
      leftSlot={<Logo />}
      rightSlot={
        <>
          <Tooltip title="Feed">
            <Button
              className={classes.navButton}
              color="inherit"
              onClick={() => {
                setAppliedFilter({ activeMediaId: undefined });
                history.push("/media/feed");
                window.scrollTo(0, 0);
              }}
            >
              <DynamicFeedIcon color="inherit" />
            </Button>
          </Tooltip>
          <Tooltip title="Map">
            <Button
              className={classes.navButton}
              color="inherit"
              onClick={() => {
                setAppliedFilter({ activeMediaId: undefined });
                history.push("/media/map");
                window.scrollTo(0, 0);
              }}
            >
              <RoomIcon color="inherit" />
            </Button>
          </Tooltip>
        </>
      }
    >
      {children}
    </NavBar>
  );
};

export default withRouter(BrowseMediaNav);
