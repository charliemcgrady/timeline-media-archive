import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";
import fs from "fs";
import { S3 } from "aws-sdk";
import path from "path";
import { mediaBucket } from "../../config/aws";
import { GIGAPIXEL_DIR, getOriginalPath } from "../workflowDao";
import sharp from "sharp";
import createThumbnailsAndUploadToS3 from "../../rgb-commons/workflow/createThumbnailsAndUploadToS3";

export const GIGAPIXEL_ASSET_KEY_PREFIX = "gigapixel-assets";

export default class UploadToS3Step extends WorkflowStep {
  name = WorkflowSteps.UPLOAD_TO_S3;

  execute = async () => {
    const jpgBuffer = await sharp(
      getOriginalPath(this.context.gigapixelKey)
    ).toBuffer();

    const thumbnailFilepaths = await createThumbnailsAndUploadToS3(
      jpgBuffer,
      this.context.gigapixelId,
      this.context.ownerId
    );

    await this.uploadToS3(
      `${GIGAPIXEL_DIR}/${this.context.gigapixelKey}`,
      `${mediaBucket}`,
      `${this.context.ownerId}/${this.context.gigapixelId}`,
      GIGAPIXEL_ASSET_KEY_PREFIX,
      this.context.gigapixelKey
    );

    return {
      ...this.context,
      gigapixelFilepaths: {
        bucket: mediaBucket,
        keyPrefix: `${this.context.ownerId}/${this.context.gigapixelId}`,
        thumbnail: thumbnailFilepaths,
        gigapixelAssetsKey: GIGAPIXEL_ASSET_KEY_PREFIX
      }
    };
  };

  uploadToS3 = async function(
    s3Path,
    bucketName,
    s3KeyBase,
    keyPrefix,
    gigapixelKey
  ) {
    const s3 = new S3();

    function walkSync(currentDirPath, callback) {
      fs.readdirSync(currentDirPath).forEach(async function(name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
          await callback(filePath, stat);
        } else if (stat.isDirectory()) {
          walkSync(filePath, callback);
        }
      });
    }

    let filepathsToUpload = [];

    walkSync(s3Path, function(filePath) {
      filepathsToUpload.push(filePath);
    });

    console.log("Beginning uploads");

    await Promise.all(
      filepathsToUpload.map(filepath => {
        // Skip the original file. It will be archived to glacier instead
        if (!isOriginalFile(filepath, gigapixelKey)) {
          let bucketPath = filepath.substring(s3Path.length + 1);
          console.log(`${s3KeyBase}/${keyPrefix}/${bucketPath}`);
          let params = {
            Bucket: bucketName,
            Key: `${s3KeyBase}/${keyPrefix}/${bucketPath}`,
            Body: fs.readFileSync(filepath)
          };
          return s3.putObject(params).promise();
        }
      })
    );

    console.log("Completed all uploads");
  };
}

const isOriginalFile = (filepath: string, gigapixelKey: string) => {
  const split = filepath.split("/");
  return split[split.length - 1] === `${gigapixelKey}.jpg`;
};
