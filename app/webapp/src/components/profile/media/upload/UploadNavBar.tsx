import React, { FunctionComponent } from "react";
import NavBar from "~/components/pure/affordances/NavBar";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { MediaType } from "~/rgb-commons/types/media";
import NavBarPasswordPrompt from "~/components/pure/affordances/NavBarPasswordPrompt";

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
  } else if (type == MediaType.GIGAPIXEL_PHOTO) {
    title = "Upload gigapixel photos";
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
        rightSlot={<NavBarPasswordPrompt />}
      >
        {children}
      </NavBar>
    </div>
  );
};

export default withRouter(UploadPhotosNavBar);
