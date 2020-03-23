import { AnnotateImageResponse } from "./vision-api";

export type S3Url = {
  bucket: string;
  key: string;
};

export type Archives = {
  gcpVisionAnnotations: AnnotateImageResponse;
  gcpStorageUrl: {
    key: string;
    bucket: string;
  };
  s3ArchivedFileUrls: Array<S3Url>;
  exif?: any;
};

export type GCPVisionTag = {
  mid: string;
  description: string;
  score: number;
};

export type Exif = {
  focalLength?: number;
  exposureTime?: number;
  cameraMake?: string;
  cameraModel?: string;
  lensModel?: string;
  brightness?: number;
  aperture?: number;
  iso?: number;
};

// Add filename so files a canonically stored in S3
export type ArchiveUrl = S3Url & { filename: string };

export type ImageSuffix = {
  jpg: string;
  webp: string;
};
export type PhotoFilePaths = {
  bucket: string;
  keyPrefix: string;
  suffixes: {
    xxs: ImageSuffix;
    xs: ImageSuffix;
    sm: ImageSuffix;
    md: ImageSuffix;
    lg: ImageSuffix;
    xl: ImageSuffix;
    xxl: ImageSuffix;
  };
};

export type PhotosphereFilePaths = {
  bucket: string;
  keyPrefix: string;
  thumbnail: PhotoFilePaths;
  photosphereAssetsKey: string;
};

export type FilePaths = PhotoFilePaths | PhotosphereFilePaths;

export type MediaLocationMap = { [locationId: string]: Location };
export type Location = {
  lat: number;
  lng: number;
  id: string;
  mediaId: string;
};

export type MediaMap = { [mediaId: string]: Media };
export type Media = {
  id: string;
  type: MediaType;
  ownerId: string;
  dateTaken: string;
  lastModified: Date;
  width: number;
  height: number;
  dominantColorHex: string;
  filepaths: FilePaths;
  rating: number;
  caption?: string;
  colors?: Array<ColorInfo>;
  archives?: Archives;
  exif?: Exif;
  // Add locationId pointer to media map to make it easier to look up locations
  locationId?: string;
};

export type ColorInfo = {
  id: string;
  rgb: { r: number; g: number; b: number };
  lab: { l: number; a: number; b: number };
  hsl: { h: number; s: number; l: number };
  score: number;
  pixelFraction: number;
};

export enum MediaType {
  PHOTOSPHERE = "photosphere",
  PHOTO = "photo"
}
