import React, { FunctionComponent } from "react";
import LocationFilter from "../browser/filters/location/LocationFilter";
import MapResults from "../browser/results/MapResults";

const MobileMapBrowser: FunctionComponent<{}> = ({}) => {
  return (
    <>
      <div
        style={{
          width: window.innerWidth,
          height: window.innerHeight / 2
        }}
      >
        <LocationFilter />
        <MapResults />
      </div>
    </>
  );
};

export default MobileMapBrowser;
