import React, { FunctionComponent, useRef } from "react";
import Geosuggest from "react-geosuggest";
import "./GeospatialSearch.css";

const GeospatialSearch: FunctionComponent<{
  onLocationSelected: (lat: number, lng: number) => void;
}> = ({ onLocationSelected }) => {
  const geosuggestRef = useRef<Geosuggest>(null);

  return (
    <Geosuggest
      ref={geosuggestRef}
      onSuggestSelect={place => {
        if (place) {
          onLocationSelected(place.location.lat, place.location.lng);
          // We know geosuggestRef has been set because the component is mounted
          geosuggestRef.current!.clear();
        }
      }}
    />
  );
};

export default GeospatialSearch;
