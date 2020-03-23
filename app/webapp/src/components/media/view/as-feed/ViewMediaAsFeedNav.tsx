import React from "react";
import { Button, Tooltip } from "@material-ui/core";
import NavBar from "~/components/pure/affordances/NavBar";
import { useHistory } from "react-router-dom";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";

const ViewMediaAsFeedNav: React.FunctionComponent<{}> = ({ children }) => {
  const history = useHistory();
  const { setAppliedFilter } = useAppliedFilter();
  return (
    <NavBar
      leftSlot={
        <Tooltip title="Scroll to the top">
          <ArrowUpwardIcon
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.scroll(0, 0);
            }}
          />
        </Tooltip>
      }
      rightSlot={
        <Button
          color="inherit"
          onClick={() => {
            setAppliedFilter({ activeMediaId: undefined });
            history.push("/media/map");
          }}
        >
          Explore Photos
        </Button>
      }
    >
      {children}
    </NavBar>
  );
};

export default ViewMediaAsFeedNav;
