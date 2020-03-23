import React, { FunctionComponent } from "react";
import NavBar from "~/components/pure/affordances/NavBar";
import { IconButton, Button, CircularProgress } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { MediaType, Media, MediaLocationMap } from "~/rgb-commons/types/media";
import { useSelector, useDispatch } from "react-redux";
import { mediaActions } from "~/redux/actions";
import { AppState } from "~/redux/store";

interface Props extends RouteComponentProps<{}> {
  media: Media;
  draftMediaLocationMap: MediaLocationMap;
}

const backUrl = (type: MediaType) => {
  let newActiveCollection = "photos";
  if (type === MediaType.PHOTOSPHERE) {
    newActiveCollection = "photospheres";
  }
  return `/profile/media/${newActiveCollection}`;
};

const EditMediaNavBar: FunctionComponent<Props> = ({
  history,
  media,
  draftMediaLocationMap,
  children
}) => {
  const dispatch = useDispatch();
  const { saveLoading } = useSelector(
    (state: AppState) => state.userData.media
  );

  return (
    <NavBar
      leftSlot={
        <IconButton
          color="inherit"
          onClick={() => history.push(backUrl(media.type))}
        >
          <ArrowBackIcon />
        </IconButton>
      }
      rightSlot={
        saveLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          <Button
            color="inherit"
            onClick={() =>
              dispatch(mediaActions.saveMedia(media, draftMediaLocationMap))
            }
          >
            Save
          </Button>
        )
      }
      title="Edit media"
    >
      {children}
    </NavBar>
  );
};

export default withRouter(EditMediaNavBar);
