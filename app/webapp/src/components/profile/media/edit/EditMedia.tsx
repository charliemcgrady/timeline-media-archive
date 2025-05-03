import React, { FunctionComponent } from "react";
import { Container, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Media, MediaLocationMap, MediaMap } from "~/rgb-commons/types/media";
import MediaGrid from "~/components/pure/widgets/media-grid/MediaGrid";
import EditMediaRating from "./EditMediaRating";
import EditMediaNavBar from "./EditMediaNavBar";
import EditMediaLocations from "./EditMediaLocations";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useMediaNavigation } from "./useMediaNavigation";
import EditMediaCaption from "./EditMediaCaption";

interface Props extends RouteComponentProps<{}> {
  media: Media;
  mediaMap: MediaMap;
  setMediaMap: (map: MediaMap) => void;
  mediaLocationMap: MediaLocationMap;
  draftMediaLocationMap: MediaLocationMap;
  setMediaLocationMap: (map: MediaLocationMap) => void;
  mediaOrder: Array<string>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center"
    },
    mediaGrid: {
      margin: "auto"
    },
    editDescription: {
      width: Math.min(
        window.innerWidth - 2 * theme.spacing(2),
        theme.breakpoints.values.sm
      ),
      padding: theme.spacing(2),
      margin: "auto"
    }
  })
);

const EditMedia: FunctionComponent<Props> = ({
  media,
  mediaMap,
  setMediaMap,
  mediaLocationMap,
  draftMediaLocationMap,
  setMediaLocationMap,
  history,
  mediaOrder
}) => {
  useMediaNavigation(history, media, draftMediaLocationMap, mediaOrder);

  const classes = useStyles();

  return (
    <EditMediaNavBar {...{ media, draftMediaLocationMap }}>
      <Container className={classes.root}>
        <MediaGrid
          className={classes.mediaGrid}
          media={[media]}
          metadata={{
            containerWidth: 300,
            targetRowHeight: (300 * media.height) / media.width
          }}
        />
        <EditMediaRating {...{ media, mediaMap, setMediaMap }} />
        <EditMediaCaption
          {...{
            media,
            mediaMap,
            setMediaMap,
            className: classes.editDescription
          }}
        />
        <EditMediaLocations
          {...{ media, mediaLocationMap, setMediaLocationMap }}
        />
      </Container>
    </EditMediaNavBar>
  );
};

export default withRouter(EditMedia);
