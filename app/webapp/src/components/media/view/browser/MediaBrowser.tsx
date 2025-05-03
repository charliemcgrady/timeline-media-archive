import React, { FunctionComponent } from "react";
import ViewMediaPanel from "./ViewMediaPanel";
import LocationFilter from "./filters/location/LocationFilter";
import BrowseMediaNav from "./nav/BrowseMediaNav";
import { useMapPageLayout } from "./useMapPageLayout";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { useIsDesktop } from "../../useIsDesktop";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightPanel: {
      marginTop: theme.spacing(2)
    }
  })
);

const BrowseMediaView: FunctionComponent<{}> = ({}) => {
  const layout = useMapPageLayout();
  const classes = useStyles();

  const isDesktop = useIsDesktop();

  return (
    <BrowseMediaNav>
      {/** Create an id used for auto-scroll to photo upon ingress; hardcoded. */}
      {isDesktop && (
        <div
          id="media-browser-right-panel"
          style={layout.rightPanel}
          className={classes.rightPanel}
        >
          <ViewMediaPanel />
        </div>
      )}
      <div style={layout.leftPanel}>
        <LocationFilter />
      </div>
    </BrowseMediaNav>
  );
};

export default BrowseMediaView;
