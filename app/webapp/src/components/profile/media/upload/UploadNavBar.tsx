import React, { FunctionComponent } from "react";
import NavBar from "~/components/pure/affordances/NavBar";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { MediaType } from "~/rgb-commons/types/media";

interface Props extends RouteComponentProps<{}> {
  type: MediaType;
}

const UploadPhotosNavBar: FunctionComponent<Props> = ({
  children,
  history,
  type
}) => {
  let title = "";
  if (type === MediaType.PHOTO) {
    title = "Upload photos";
  } else if (type == MediaType.PHOTOSPHERE) {
    title = "Upload photo spheres";
  }

  return (
    <div>
      <NavBar
        title={title}
        leftSlot={
          <IconButton
            color="inherit"
            onClick={() => history.push(`/profile/media/${type}s`)}
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

export default withRouter(UploadPhotosNavBar);
