import React, { FunctionComponent } from "react";
import { Location, Media, MediaLocationMap } from "~/rgb-commons/types/media";
import Map from "~/components/pure/widgets/map/Map";
import { generateLocationId } from "~/rgb-commons/uuidFactory";
import CircleLayer from "~/components/pure/widgets/map/layers/CircleLayer";
import GeospatialSearch from "~/components/pure/affordances/GeospatialSearch";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    locationSearch: {
      marginBottom: theme.spacing(2),
      width: "50%",
      minWidth: 400,
      marginRight: "auto",
      marginLeft: "auto"
    },
    root: {
      marginTop: theme.spacing(3),
      height: 400,
      margin: "auto",
      maxWidth: 800
    },
    map: {
      marginBottom: theme.spacing(3)
    }
  })
);

const EditMediaLocations: FunctionComponent<{
  media: Media;
  mediaLocationMap: MediaLocationMap;
  setMediaLocationMap: (location: MediaLocationMap) => void;
}> = ({ mediaLocationMap, setMediaLocationMap, media }) => {
  const [zoom, setZoom] = React.useState(6);

  const locations: Array<Location> = Object.keys(mediaLocationMap)
    .filter(id => mediaLocationMap[id].mediaId === media.id)
    .map(id => mediaLocationMap[id]);

  const center = locations[0]
    ? { lat: locations[0].lat, lng: locations[0].lng }
    : undefined;

  const id = locations[0] ? locations[0].id : generateLocationId();
  const setNewLocation = (lat: number, lng: number) => {
    setZoom(10);
    setMediaLocationMap({
      ...{
        [id]: {
          id,
          lat,
          lng,
          mediaId: media.id
        }
      }
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.locationSearch}>
        <GeospatialSearch onLocationSelected={setNewLocation} />
      </div>
      <Map
        zoom={zoom}
        center={center}
        onDoubleClick={setNewLocation}
        className={classes.map}
      >
        <CircleLayer
          features={
            center
              ? [
                  {
                    lat: center.lat,
                    lng: center.lng,
                    id: media.id,
                    colorInHex: media.dominantColorHex
                  }
                ]
              : []
          }
        />
      </Map>
    </div>
  );
};

export default EditMediaLocations;
