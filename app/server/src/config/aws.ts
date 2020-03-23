import process from "process";

export const addPhotoLambda = process.env.ADD_PHOTO_LAMBDA as string;
export const addPhotosphereLambda = process.env
  .ADD_PHOTOSPHERE_LAMBDA as string;
export const tempMediaBucket = process.env.TEMP_MEDIA_BUCKET as string;
export const mediaBucket = process.env.MEDIA_BUCKET as string;
