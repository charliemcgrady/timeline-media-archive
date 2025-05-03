const boundingBoxesWithBadSatelliteImagery = [
  {
    // India
    upperLeft: {
      lat: 31.005989,
      lng: 68.158015
    },
    bottomRight: {
      lat: 3.638125,
      lng: 91.435521
    }
  }
];

export const getNormalizedZoom = (
  proposedZoom: number,
  center: { lat: number; lng: number }
) => {
  let zoom = proposedZoom;
  if (proposedZoom < 9) {
    return zoom;
  }

  boundingBoxesWithBadSatelliteImagery.forEach(bounds => {
    if (
      center.lng > bounds.upperLeft.lng &&
      center.lng < bounds.bottomRight.lng &&
      center.lat < bounds.upperLeft.lat &&
      center.lat > bounds.bottomRight.lat
    ) {
      zoom = 9;
    }
  });

  return zoom;
};
