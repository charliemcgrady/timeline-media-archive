import React from "react";
import { Button, Tooltip } from "@material-ui/core";
import NavBar from "~/components/pure/affordances/NavBar";
import { useHistory } from "react-router-dom";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import RoomIcon from "@material-ui/icons/Room";
import Logo from "~/components/pure/affordances/Logo";

const MediaFeedNav: React.FunctionComponent<{}> = ({ children }) => {
  const history = useHistory();
  const { setAppliedFilter } = useAppliedFilter();
  return (
    <NavBar
      leftSlot={<Logo />}
      rightSlot={
        <>
          <Tooltip title="Scroll to the top">
            <ArrowUpwardIcon
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.scroll(0, 0);
              }}
            />
          </Tooltip>
          <Tooltip title="Map">
            <Button
              color="inherit"
              onClick={() => {
                setAppliedFilter({ activeMediaId: undefined });
                history.push("/media/map");
              }}
            >
              <RoomIcon
                color="inherit"
                onClick={() => history.push("/media/map")}
              />
            </Button>
          </Tooltip>
        </>
      }
    >
      {children}
    </NavBar>
  );
};

export default MediaFeedNav;
