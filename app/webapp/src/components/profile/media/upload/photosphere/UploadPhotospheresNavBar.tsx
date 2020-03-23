import React, { FunctionComponent } from "react";
import NavBar from "~/components/pure/affordances/NavBar";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface Props extends RouteComponentProps<{}> {}

const UploadPhotospheresNavBar: FunctionComponent<Props> = ({
  children,
  history
}) => {
  return (
    <div>
      <NavBar
        title="Upload photo spheres"
        leftSlot={
          <IconButton
            color="inherit"
            onClick={() => history.push("/profile/media/photosphere")}
          >
            <ArrowBackIcon />
          </IconButton>
        }
      >
        {children}
      </NavBar>
    </div>
  );
};

export default withRouter(UploadPhotospheresNavBar);
