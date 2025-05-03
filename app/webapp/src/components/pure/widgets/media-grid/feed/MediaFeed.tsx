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
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import TextWidget from "../../text/TextWidget";
import IconActions from "./IconActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4)
    },
    caption: {
      maxWidth: theme.breakpoints.values.sm,
      marginRight: "auto",
      marginLeft: "auto",
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2)
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
          <div id={photo.id} key={photo.id} className={classes.section}>
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
            <IconActions photo={photo} width={params.width} />
            {photo.caption && <TextWidget metadata={{ html: photo.caption }} />}
          </div>
        );
      })}
    </div>
  );
};

export default MediaFeed;
