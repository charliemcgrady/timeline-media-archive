import { PhotoFilePaths } from "../types/media";
import { mediaBucket } from "../../config/aws";
import { S3 } from "aws-sdk";
const sharp = require("sharp");

// Used by asset workflows to generate thumbnails for images
export default async (
  jpgBuffer: Buffer,
  mediaId: string,
  ownerId: string
): Promise<PhotoFilePaths> => {
  const webpFile = await sharp(jpgBuffer)
    .webp()
    .toBuffer();

  const jpgThumbnails = await createThumbnails(jpgBuffer);
  const webpThumbnails = await createThumbnails(webpFile);

  await uploadToS3(jpgThumbnails, "jpg", mediaId, ownerId);
  await uploadToS3(webpThumbnails, "webp", mediaId, ownerId);

  return buildFilePaths(mediaId, ownerId);
};

type ThumbnailBuffers = {
  xxs: Buffer;
  xs: Buffer;
  sm: Buffer;
  md: Buffer;
  lg: Buffer;
  xl: Buffer;
  xxl: Buffer;
};
const createThumbnails = async (src: Buffer): Promise<ThumbnailBuffers> => {
  const xxs = await sharp(src)
    .resize(50, 50, { fit: "inside" })
    .toBuffer();
  const xs = await sharp(src)
    .resize(150, 150, { fit: "inside" })
    .toBuffer();
  const sm = await sharp(src)
    .resize(300, 300, { fit: "inside" })
    .toBuffer();
  const md = await sharp(src)
    .resize(750, 750, { fit: "inside" })
    .toBuffer();
  const lg = await sharp(src)
    .resize(1500, 1500, { fit: "inside" })
    .toBuffer();
  const xl = await sharp(src)
    .resize(3000, 3000, { fit: "inside" })
    .toBuffer();
  const xxl = await sharp(src)
    .resize(4500, 4500, { fit: "inside" })
    .toBuffer();
  return { xxs, xs, sm, md, lg, xl, xxl };
};

const uploadToS3 = async (
  buffers: ThumbnailBuffers,
  extension: string,
  mediaId: string,
  ownerId: string
) => {
  const s3 = new S3();

  const config = (buffer: Buffer, id: string) => ({
    Bucket: mediaBucket,
    Body: buffer,
    Key: `${ownerId}/${mediaId}/${mediaId}_${id}.${extension}`
  });

  return Promise.all([
    s3.putObject(config(buffers.xs, "xxs")).promise(),
    s3.putObject(config(buffers.xs, "xs")).promise(),
    s3.putObject(config(buffers.sm, "sm")).promise(),
    s3.putObject(config(buffers.md, "md")).promise(),
    s3.putObject(config(buffers.lg, "lg")).promise(),
    s3.putObject(config(buffers.xl, "xl")).promise(),
    s3.putObject(config(buffers.xxl, "xxl")).promise()
  ]);
};

const buildFilePaths = (mediaId: string, ownerId: string): PhotoFilePaths => ({
  bucket: mediaBucket,
  keyPrefix: `${ownerId}/${mediaId}/${mediaId}`,
  suffixes: {
    xxs: { jpg: "_xxs.jpg", webp: "_xxs.webp" },
    xs: { jpg: "_xs.jpg", webp: "_xs.webp" },
    sm: { jpg: "_sm.jpg", webp: "_sm.webp" },
    md: { jpg: "_md.jpg", webp: "_md.webp" },
    lg: { jpg: "_lg.jpg", webp: "_lg.webp" },
    xl: { jpg: "_xl.jpg", webp: "_xl.webp" },
    xxl: { jpg: "_xxl.jpg", webp: "_xxl.webp" }
  }
});
