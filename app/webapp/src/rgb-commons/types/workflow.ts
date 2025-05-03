import { S3Url, ArchiveUrl } from "./media";

export type ProcessPhotoEvent = {
  photoId: string;
  // The url for the file intended to be processed / displayed publically
  primaryJpegUrl: S3Url;
  ownerId: string;
  // All the files included in the original file upload. This will be permenantly archived.
  originalFiles: Array<ArchiveUrl>;
};

export type ProcessPhotosphereEvent = {
  photosphereId: string;
  ownerId: string;
  // The zip file produced by the Marzipano tool
  zipUrl: S3Url;
  // The string applied to the asset by the Marzipano tool
  marzipanoKey: string;
};
