import React, { FunctionComponent } from "react";
import MediaGrid from "~/components/pure/widgets/media-grid/MediaGrid";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import { useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import { useMapPageLayout } from "../useMapPageLayout";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      paddingTop: theme.spacing(1)
    }
  })
);

const MapResults: FunctionComponent<{}> = () => {
  const { mediaIds, setAppliedFilter } = useAppliedFilter();
  const layout = useMapPageLayout();
  const { mediaMap } = useSelector((state: AppState) => state.userData.media);
  const classes = useStyles();

  const onMediaClicked = (id: string) =>
    setAppliedFilter({ activeMediaId: id });

  return (
    <div style={layout.mapResults} className={classes.root}>
      <Typography color="textSecondary" display="block" variant="caption">
        <i>Browse media visible in the map.</i>
      </Typography>
      <MediaGrid
        onMediaClicked={onMediaClicked}
        media={mediaIds.unfiltered.map(id => mediaMap[id])}
        metadata={{
          targetRowHeight: 75,
          boxSpacing: {
            vertical: 0,
            horizontal: 0
          },
          containerWidth: layout.mapResults.width as number
        }}
      />
    </div>
  );
};

export default MapResults;
