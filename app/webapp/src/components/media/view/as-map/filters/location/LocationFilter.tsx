import React, { useState, useRef, useEffect } from "react";
import { makeStyles, Theme, createStyles, Grid } from "@material-ui/core";
import Map from "~/components/pure/widgets/map";
import CircleLayer from "~/components/pure/widgets/map/layers/CircleLayer";
import GeospatialSearch from "~/components/pure/affordances/GeospatialSearch";
import { useSelector } from "react-redux";
import { AppState } from "~/redux/store";
import {
  openPhotoswipe,
  photosToPhotoswipeItems
} from "~/components/pure/widgets/photoswipe/photoswipeUtils";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import { LngLatBounds, LngLat } from "mapbox-gl";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import { useMapPageLayout } from "../../useMapPageLayout";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      marginBottom: theme.spacing(2),
      position: "absolute"
    },
    expandToFill: {
      width: "100%",
      height: "100%"
    },
    searchBar: {
      position: "absolute",
      left: 0,
      right: 0,
      width: 200,
      marginTop: 12,
      marginRight: "auto",
      marginLeft: "auto",
      zIndex: 1000
    }
  });
});

const LocationFilter: React.FunctionComponent<{}> = () => {
  const { appliedFilter, mediaIds, setAppliedFilter } = useAppliedFilter();
  const { mediaLocationMap, mediaMap } = useSelector(
    (state: AppState) => state.userData.media
  );

  const activeMediaLocation =
    appliedFilter.activeMediaId &&
    mediaMap[appliedFilter.activeMediaId].locationId
      ? mediaLocationMap[mediaMap[appliedFilter.activeMediaId].locationId!]
      : undefined;

  const [center, setCenter] = useState<
    { lat: number; lng: number } | undefined
  >(
    activeMediaLocation
      ? { lat: activeMediaLocation.lat, lng: activeMediaLocation.lng }
      : undefined
  );

  const layout = useMapPageLayout();

  const onLocationChanged = (lat: number, lng: number) => {
    setCenter({ lat, lng });
  };

  // Our map is managed outside of the React component lifecycle
  // Therefore, onDateSelected will see a stale version of appliedFilter.
  // Manage the value in a ref instead.
  //
  // https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function
  const appliedFilterRef = useRef(appliedFilter);

  const onMapBoundsUpdated = (bounds: mapboxgl.LngLatBounds, zoom: number) => {
    setAppliedFilter({
      // If the user has zoomed all the way out, remove the geospatial filter
      geospatialGeometry:
        zoom < 1
          ? undefined
          : {
              type: "Polygon",
              coordinates: [
                [
                  [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
                  [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
                  [bounds.getSouthEast().lng, bounds.getSouthEast().lat],
                  [bounds.getSouthWest().lng, bounds.getSouthWest().lat]
                ]
              ]
            }
    });
  };

  const determineBoundsOfStory = (story: StoryConfig) => {
    let bounds: LngLatBounds | undefined;
    const media = Object.keys(story.media);
    Object.keys(mediaLocationMap).forEach(id => {
      if (media.includes(mediaLocationMap[id].mediaId)) {
        if (!bounds) {
          bounds = new LngLatBounds();
        }

        bounds.extend(
          new LngLat(mediaLocationMap[id].lng, mediaLocationMap[id].lat)
        );
      }
    });
    return bounds;
  };

  const classes = useStyles();

  useEffect(() => {
    // Fly to the active media's location
    if (
      appliedFilter.activeMediaId &&
      appliedFilterRef.current.activeMediaId !== appliedFilter.activeMediaId &&
      mediaMap[appliedFilter.activeMediaId].locationId &&
      mediaLocationMap[mediaMap[appliedFilter.activeMediaId].locationId!]
    ) {
      const { lat, lng } = mediaLocationMap[
        mediaMap[appliedFilter.activeMediaId].locationId!
      ];
      if (lat && lng) {
        setCenter({
          lat,
          lng
        });
      }
    }

    if (
      Object.keys(appliedFilter).length === 0 &&
      Object.keys(appliedFilterRef.current).length !== 0
    ) {
      setCenter({ lat: 0, lng: 0 });
    }

    appliedFilterRef.current = appliedFilter;
  });

  return (
    <div
      style={{
        marginBottom: layout.map.height as number,
        float: "left"
      }}
    >
      <div
        className={classes.root}
        style={{
          // The map container is absolutely positioned. Prepend a div to offset spacing
          width: layout.map.width,
          position: "absolute",
          height: 0,
          marginBottom: layout.map.height
        }}
      ></div>
      <Grid
        className={classes.root}
        style={{
          width: layout.map.width,
          height: layout.map.height,
          marginBottom: -layout.map.height!
        }}
      >
        <div className={classes.searchBar}>
          <GeospatialSearch onLocationSelected={onLocationChanged} />
        </div>
        <Grid item xs={12}>
          <div style={{ ...layout.map }}>
            <Map
              onMoveEnd={onMapBoundsUpdated}
              center={center}
              zoom={
                activeMediaLocation
                  ? 12
                  : appliedFilterRef.current.geospatialGeometry !== undefined &&
                    appliedFilter.geospatialGeometry === undefined
                  ? 0
                  : 1
              }
              bounds={
                appliedFilter.activeStory && appliedFilterRef.current
                  ? determineBoundsOfStory(appliedFilter.activeStory)
                  : undefined
              }
            >
              <CircleLayer
                radius={5}
                onClick={ids => {
                  const { items } = photosToPhotoswipeItems(
                    ids.map(id => mediaMap[id])
                  );
                  openPhotoswipe(items);
                }}
                features={Object.keys(mediaLocationMap)
                  .filter(id =>
                    mediaIds.unfiltered.includes(mediaLocationMap[id].mediaId)
                  )
                  .map(id => ({
                    lat: mediaLocationMap[id].lat,
                    lng: mediaLocationMap[id].lng,
                    id: mediaLocationMap[id].mediaId,
                    colorInHex:
                      mediaMap[mediaLocationMap[id].mediaId].dominantColorHex
                  }))}
              />
            </Map>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LocationFilter;
