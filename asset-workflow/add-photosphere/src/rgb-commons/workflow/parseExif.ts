import decodeExif from "exif-reader";
import { ExifParserFactory } from "ts-exif-parser";
import { Exif } from "../types/media";
import sharp = require("sharp");

export type ParsedExifInfo = {
  width: number;
  height: number;
  dateTaken: string;
  exif: Exif;
  decodedExif: any;
};

export default async (jpgBuffer: Buffer): Promise<ParsedExifInfo> => {
  const culledExif: Exif = {};

  const { width, height, exif } = await sharp(jpgBuffer).metadata();

  console.log("Unprocecced EXIF");
  console.log(exif);

  const tags = ExifParserFactory.create(jpgBuffer).parse().tags || {};
  const decodedExif = exif ? decodeExif(exif) : {};

  const dateTaken =
    decodedExif.exif && decodedExif.exif.DateTimeOriginal
      ? new Date(decodedExif.exif.DateTimeOriginal).toUTCString()
      : new Date().toUTCString();

  if (tags.ApertureValue) culledExif.aperture = +tags.ApertureValue;
  if (tags.FNumber) culledExif.aperture = +tags.FNumber;
  if (tags.BrightnessValue) culledExif.brightness = +tags.BrightnessValue;
  if (tags.FocalLengthIn35mmFormat)
    culledExif.focalLength = +tags.FocalLengthIn35mmFormat;
  if (tags.ExposureTime) culledExif.exposureTime = +tags.ExposureTime;
  if (tags.Model) culledExif.cameraModel = tags.Model;
  if (tags.Make) culledExif.cameraMake = tags.Make;
  if (tags.LensModel) culledExif.lensModel = tags.LensModel;
  if (tags.ISO) culledExif.iso = +tags.ISO;

  return { dateTaken, width, height, exif: culledExif, decodedExif };
};
