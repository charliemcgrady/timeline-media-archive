import React, { FunctionComponent, useEffect } from "react";

const CircleLayer: FunctionComponent<{
  map?: mapboxgl.Map;
  features: Array<{ lat: number; lng: number; colorInHex: string; id: string }>;
  radius?: number;
  onClick?: (ids: Array<string>) => void;
}> = ({ map, features, radius = 15, onClick }) => {
  if (!map) {
    return null;
  }

  useEffect(() => {
    const data: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
      type: "FeatureCollection",
      features: features.map(({ lat, lng, colorInHex, id }) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        properties: {
          colorInHex: colorInHex,
          id: id
        }
      }))
    };

    if (!map.getSource("points")) {
      map.addSource("points", {
        type: "geojson",
        data
      });
    } else {
      const source: mapboxgl.GeoJSONSource = map.getSource(
        "points"
      ) as mapboxgl.GeoJSONSource;
      source.setData(data);
    }

    if (!map.getLayer("points")) {
      // Add a white outline to make sure the circle can be seen
      map.addLayer({
        id: "points",
        type: "circle",
        source: "points",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            radius + 3,
            12,
            radius + 8
          ],
          "circle-color": "white"
        }
      });
      map.addLayer({
        id: "points-outline",
        type: "circle",
        source: "points",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            radius,
            12,
            radius + 5
          ],
          "circle-color": ["get", "colorInHex"]
        }
      });

      if (onClick) {
        map.on("click", "points", e => {
          if (e.features) {
            onClick(e.features.map(f => f.properties!.id));
          }
        });
      }
    }
  }, [features]);

  return <></>;
};

export default CircleLayer;
