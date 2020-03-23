import React, {
  FunctionComponent,
  CSSProperties,
  useLayoutEffect
} from "react";
import Placeholder from "~/components/pure/widgets/media-grid/Placeholder";
import Image, {
  getClassName
} from "~/components/pure/widgets/media-grid/Image";
import * as Widget from "~/rgb-commons/types/widgets";
import {
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Tooltip
} from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import { useHistory } from "react-router-dom";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4)
    },
    caption: {
      maxWidth: theme.breakpoints.values.sm,
      marginRight: "auto",
      marginLeft: "auto"
    },
    iconActions: {
      textAlign: "right",
      margin: "auto"
    },
    icon: {
      cursor: "pointer"
    }
  })
);

const MediaFeed: FunctionComponent<{
  media: Array<Widget.MediaGrid.RequiredMediaConfig>;
  layout: Widget.MediaGrid.LayoutMetadata;
  onMediaClicked: (id: string) => void;
  className: string;
  setImageContainer: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null>
  >;
}> = ({ layout, media, className, onMediaClicked, setImageContainer }) => {
  const history = useHistory();
  const { appliedFilter } = useAppliedFilter();

  useLayoutEffect(() => {
    if (appliedFilter.activeMediaId) {
      const elem = document.getElementsByClassName(
        getClassName(appliedFilter.activeMediaId)
      )[0];
      if (elem) {
        elem.scrollIntoView();
      }
    }
  });

  const classes = useStyles();
  return (
    <div
      className={className}
      style={{
        width: window.innerWidth
      }}
      ref={setImageContainer}
    >
      {layout.boxes.map((params: Widget.MediaGrid.LayoutParams, i: number) => {
        const photo = media[i];
        if (!photo) return;

        const layoutStyle: CSSProperties = {
          position: "relative",
          width: params.width,
          height: params.height,
          top: 0,
          left: 0
        };

        return (
          <div key={photo.id} className={classes.section}>
            <Placeholder
              dominantColorHex={photo.dominantColorHex}
              layoutStyle={{
                ...layoutStyle,
                marginBottom: -params.height,
                marginRight: "auto",
                marginLeft: "auto"
              }}
            />
            <div style={{ width: "100%", textAlign: "center" }}>
              <Image
                id={photo.id}
                targetPhotoHeight={params.height}
                layoutStyle={layoutStyle}
                onClick={onMediaClicked}
              />
            </div>
            <div
              className={classes.iconActions}
              style={{ width: params.width }}
            >
              <Tooltip title="View on map">
                <RoomIcon
                  fontSize="large"
                  className={classes.icon}
                  onClick={() =>
                    history.push(`/media/map?activeMediaId=${photo.id}`)
                  }
                />
              </Tooltip>
            </div>
            {photo.caption && (
              <Typography className={classes.caption}>
                {photo.caption}
              </Typography>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MediaFeed;
