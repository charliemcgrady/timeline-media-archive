import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import mapboxgl, { LngLatBounds } from "mapbox-gl";
// We should be loading the css from the maxpbox-gl dist folder. However,
// we were running into this issue: https://github.com/cssnano/cssnano/issues/821
// Manually load the CSS and inline SVG images instead
import "./css/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import distance from "@turf/distance";
import { point } from "@turf/turf";

const accessToken =
  "pk.eyJ1IjoiY29kZXdhcnJpb3IiLCJhIjoiWjNEOXI0ZyJ9.CDfrqllERlQtYenTaK43kQ";
mapboxgl.accessToken = accessToken;

export interface Props {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  bounds?: LngLatBounds;
  onDoubleClick?: (lat: number, lng: number) => void;
  onMoveEnd?: (bounds: mapboxgl.LngLatBounds, zoom: number) => void;
  className?: string;
}

export interface ChildProps {
  map: mapboxgl.Map;
}

const Map: FunctionComponent<Props> = ({
  center = { lat: 0, lng: 0 },
  zoom,
  children,
  onDoubleClick,
  onMoveEnd,
  bounds,
  className = ""
}) => {
  const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);
  const mapRef = useRef<HTMLDivElement>(null);

  // Used to determine if the parent component has passed in new map params
  // (e.g. changed the center and zoom of the map)
  const centerRef = useRef(center);
  const zoomRef = useRef(zoom);
  const boundsRef = useRef(bounds);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current as HTMLElement,
      renderWorldCopies: false,
      style: "mapbox://styles/mapbox/satellite-streets-v9",
      center: center,
      zoom: zoom || 0,
      maxZoom: 14
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));

    if (onMoveEnd) {
      map.on("moveend", () => {
        onMoveEnd(map.getBounds(), map.getZoom());
      });
    }

    if (onDoubleClick) {
      map.on("dblclick", e => onDoubleClick(e.lngLat.lat, e.lngLat.lng));
    }

    map.on("load", () => {
      if (bounds) {
        map.fitBounds(bounds, { padding: 50 });
      }

      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();

      setMap(map);
    });
  }, []);

  if (
    (map && centerRef.current.lng !== center.lng) ||
    (map && centerRef.current.lat !== center.lat)
  ) {
    if (center.lat !== 0 && center.lng !== 0) {
      const distanceBetweenPoints = distance(
        point([center.lng, center.lat]),
        point([centerRef.current.lng, centerRef.current.lat]),
        "miles"
      );

      // I find the animations over long distances nauseating
      if (distanceBetweenPoints < 20) {
        map!.flyTo({
          center,
          zoom: 12,
          essential: true
        });
      } else {
        map!.setCenter(center);
        map!.setZoom(12);
      }
    }

    centerRef.current = center;
  } else if (map && zoom !== undefined && zoomRef.current !== zoom) {
    map!.setZoom(zoom);
    if (zoom === 0) {
      map!.setCenter({ lat: 0, lng: 0 });
    }
  }

  if (map && bounds && bounds !== boundsRef.current) {
    map.fitBounds(bounds, { padding: 50 });
  }

  useEffect(() => {
    zoomRef.current = zoom;
    boundsRef.current = bounds;
  });

  return (
    <div
      ref={mapRef}
      style={{ height: "100%", width: "100%" }}
      className={className}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement<ChildProps>(
            child as React.ReactElement<ChildProps>,
            { map }
          );
        } else {
          return undefined;
        }
      })}
    </div>
  );
};

export default Map;
