import React from "react";
import { IconButton } from "@material-ui/core";
import NavBar from "~/components/pure/affordances/NavBar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, useLocation } from "react-router-dom";
import { parse } from "query-string";

const ViewStoryNav: React.FunctionComponent<{}> = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const onBack = () => {
    const returnTo = parse(location.search).returnTo;
    if (returnTo) {
      history.push(returnTo as string);
    } else {
      history.push("/media");
    }
  };

  return (
    <NavBar
      leftSlot={
        <IconButton color="inherit" onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
      }
    >
      {children}
    </NavBar>
  );
};

export default ViewStoryNav;
