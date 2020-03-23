import React, { FunctionComponent } from "react";
import ViewMediaPanel from "./ViewMediaPanel";
import LocationFilter from "./filters/location/LocationFilter";
import ViewMediaAsMapNav from "./nav/ViewMediaAsMapNav";
import { useMapPageLayout } from "./useMapPageLayout";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import MapResults from "./results/MapResults";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightPanel: {
      marginTop: theme.spacing(2)
    }
  })
);

const ViewMediaAsMap: FunctionComponent<{}> = ({}) => {
  const layout = useMapPageLayout();
  const classes = useStyles();

  return (
    <ViewMediaAsMapNav>
      <div style={layout.leftPanel}>
        <LocationFilter />
        <MapResults />
      </div>
      <div style={layout.rightPanel} className={classes.rightPanel}>
        <ViewMediaPanel />
      </div>
    </ViewMediaAsMapNav>
  );
};

export default ViewMediaAsMap;
