import { Archives, Location } from "rgb-commons/types/media";
import { ColorInfo, MediaType } from "rgb-commons/types/media";
import knexProvider from "../../shared/knexProvider";

export const colorInfoToColorDB = (
  input: ColorInfo,
  mediaId: string,
  mediaType: MediaType
) => {
  return {
    mediaId: mediaId,
    type: mediaType,
    rgbR: input.rgb.r,
    rgbG: input.rgb.g,
    rgbB: input.rgb.b,
    rgbCube: knexProvider
      .get()
      .raw(`cube(array[${input.rgb.r}, ${input.rgb.g}, ${input.rgb.b}])`),
    hslH: input.hsl.h,
    hslS: input.hsl.s,
    hslL: input.hsl.l,
    hslCube: knexProvider
      .get()
      .raw(`cube(array[${input.hsl.h}, ${input.hsl.s}, ${input.hsl.l}])`),
    labL: input.lab.l,
    labA: input.lab.a,
    labB: input.lab.b,
    labCube: knexProvider
      .get()
      .raw(`cube(array[${input.lab.l}, ${input.lab.a}, ${input.lab.b}])`),
    score: input.score,
    pixelFraction: input.pixelFraction
  };
};

export const archivesToArchiveDB = (input: Archives) => {
  return {
    gcpVisionAnnotations: input.gcpVisionAnnotations,
    exif: input.exif,
    s3ArchivedFileUrls: input.s3ArchivedFileUrls,
    gcpStorageKey: input.gcpStorageUrl && input.gcpStorageUrl.key,
    gcpStorageBucket: input.gcpStorageUrl && input.gcpStorageUrl.bucket
  };
};

export const locationToLocationDB = (location: Location) => {
  return {
    id: location.id,
    coordinates: `POINT(${location.lng} ${location.lat})`,
    type: "LOCATION_OF_CAPTURE",
    mediaId: location.mediaId
  };
};
