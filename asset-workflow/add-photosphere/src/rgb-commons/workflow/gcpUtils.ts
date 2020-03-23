import { photosBucket } from "../../config/gcp";
import sharp = require("sharp");
import {
  AnnotateImageResponse,
  AnnotateImageRequest
} from "../types/vision-api";
import vision from "@google-cloud/vision";
import { Storage } from "@google-cloud/storage";

export const uploadToGCP = async (key: string, buffer: Buffer) => {
  const storage = new Storage();
  const cloudFile = storage.bucket(photosBucket).file(key);
  const resizedFile = await sharp(buffer)
    .resize(1000, 1000, { fit: "inside" })
    .toBuffer();

  return cloudFile.save(resizedFile);
};

export const processImage = async (
  key: string
): Promise<AnnotateImageResponse> => {
  const client = new vision.ImageAnnotatorClient();

  const response: Array<AnnotateImageResponse> = await client.annotateImage({
    image: {
      source: { imageUri: `gs://${photosBucket}/${key}` }
    },
    features: [
      { type: "FACE_DETECTION" },
      { type: "LANDMARK_DETECTION" },
      { type: "LABEL_DETECTION" },
      { type: "TEXT_DETECTION" },
      { type: "IMAGE_PROPERTIES" },
      { type: "OBJECT_LOCALIZATION" }
    ]
  } as AnnotateImageRequest);

  if (!response[0] || response[0].error) {
    throw new Error("Error detected when processing image with Vision API");
  }

  return response[0];
};
