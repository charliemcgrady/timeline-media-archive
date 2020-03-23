export type Fields =
  | MediaFields
  | MediaExifFields
  | MediaColorsFields
  | PhotoArchivesFields
  | PhotoLocationFields
  | TagsFields
  | TagEdgesFields
  | StoriesFields;

export class DBSchema {
  private table: string;
  private fields: Fields;

  constructor(table: string, fields: Fields) {
    this.table = table;
    this.fields = fields;
  }

  getTable() {
    return this.table;
  }
  getFields() {
    return this.fields;
  }
}

export type MediaFields = {
  [key: string]: string;
  id: string;
  ownerId: string;
  dateTaken: string;
  lastModified: string;
  type: string;
  rating: string;
  width: string;
  height: string;
  dominantColorHex: string;
  filepaths: string;
  caption: string;
};
export const mediaSchema: DBSchema = new DBSchema("media", {
  id: "id",
  ownerId: "owner_id",
  dateTaken: "date_taken",
  lastModified: "last_modified",
  type: "type",
  rating: "rating",
  width: "width",
  height: "height",
  dominantColorHex: "dominant_color_hex",
  filepaths: "filepaths",
  caption: "caption"
});

export type MediaExifFields = {
  [key: string]: string;
  id: string;
  focalLength: string;
  exposureTime: string;
  cameraModel: string;
  cameraMake: string;
  lensModel: string;
  brightness: string;
  aperture: string;
  iso: string;
};
export const mediaExifSchema: DBSchema = new DBSchema("media_exif", {
  id: "id",
  focalLength: "focal_length_full_frame",
  exposureTime: "exposure_time",
  cameraModel: "camera_model",
  cameraMake: "camera_make",
  lensModel: "lens_model",
  brightness: "brightness",
  aperture: "aperture",
  iso: "iso"
});

export type MediaColorsFields = {
  [key: string]: string;
  id: string;
  mediaId: string;
  type: string;
  rgbR: string;
  rgbG: string;
  rgbB: string;
  rgbCube: string;
  labL: string;
  labA: string;
  labB: string;
  labCube: string;
  hslH: string;
  hslS: string;
  hslL: string;
  hslCube: string;
  score: string;
  pixelFraction: string;
};
export const mediaColorsSchema: DBSchema = new DBSchema("media_colors", {
  id: "id",
  mediaId: "media_id",
  type: "type",
  rgbR: "rgb_r",
  rgbG: "rgb_g",
  rgbB: "rgb_b",
  rgbCube: "rgb_cube",
  labL: "lab_l",
  labA: "lab_a",
  labB: "lab_b",
  labCube: "lab_cube",
  hslH: "hsl_h",
  hslS: "hsl_s",
  hslL: "hsl_l",
  hslCube: "hsl_cube",
  score: "score",
  pixelFraction: "pixel_fraction"
});

export type PhotoArchivesFields = {
  [key: string]: string;
  id: string;
  gcpStorageKey: string;
  gcpStorageBucket: string;
  gcpVisionAnnotations: string;
  s3ArchivedFileUrls: string;
  exif: string;
};
export const mediaArchivesSchema: DBSchema = new DBSchema("media_archives", {
  id: "id",
  mediaId: "photo_id",
  gcpVisionAnnotations: "gcp_vision_annotations",
  gcpStorageKey: "gcp_storage_key",
  gcpStorageBucket: "gcp_storage_bucket",
  s3ArchivedFileUrls: "s3_archived_file_urls",
  exif: "exif"
});

export type PhotoLocationFields = {
  [key: string]: string;
  id: string;
  mediaId: string;
  type: string;
  coordinates: string;
  rotation: string;
};
export const mediaLocationsSchema: DBSchema = new DBSchema("media_locations", {
  id: "id",
  mediaId: "media_id",
  type: "type",
  coordinates: "coordinates",
  rotation: "rotation"
});

export type TagsFields = {
  [key: string]: string;
  id: string;
  ownerId: string;
  label: string;
};
export const tagsSchema: DBSchema = new DBSchema("tags", {
  id: "id",
  ownerId: "owner_id",
  label: "label"
});

export type TagEdgesFields = {
  [key: string]: string;
  id: string;
  tagId: string;
  mediaId: string;
  rank: string;
};
export const tagEdgesSchema: DBSchema = new DBSchema("tag_edges", {
  id: "id",
  tagId: "tag_id",
  mediaId: "mediaId",
  rank: "rank"
});

export type StoriesFields = {
  [key: string]: string;
  id: string;
  title: string;
  ownerId: string;
  dateCreated: string;
  lastModified: string;
  widgets: string;
};
export const storiesSchema: DBSchema = new DBSchema("stories", {
  id: "id",
  title: "title",
  ownerId: "owner_id",
  dateCreated: "date_created",
  lastModified: "last_modified",
  widgets: "widgets"
});
