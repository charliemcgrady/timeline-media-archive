import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";
import fs from "fs";
import { S3 } from "aws-sdk";
import path from "path";
import { mediaBucket } from "../../config/aws";
import { PHOTOSPHERE_DIR, getThumbnailPath } from "../workflowDao";
import sharp from "sharp";
import createThumbnailsAndUploadToS3 from "../../rgb-commons/workflow/createThumbnailsAndUploadToS3";

export const MARZIPANO_ASSET_KEY_PREFIX = "marzipano-assets";

export default class UploadToS3Step extends WorkflowStep {
  name = WorkflowSteps.UPLOAD_TO_S3;

  execute = async () => {
    const jpgBuffer = await sharp(
      getThumbnailPath(this.context.marzipanoKey)
    ).toBuffer();

    const thumbnailFilepaths = await createThumbnailsAndUploadToS3(
      jpgBuffer,
      this.context.photosphereId,
      this.context.ownerId
    );

    await this.uploadToS3(
      `${PHOTOSPHERE_DIR}/${this.context.marzipanoKey}`,
      `${mediaBucket}`,
      `${this.context.ownerId}/${this.context.photosphereId}`,
      MARZIPANO_ASSET_KEY_PREFIX
    );

    return {
      ...this.context,
      marzipanoFilePaths: {
        bucket: mediaBucket,
        keyPrefix: `${this.context.ownerId}/${this.context.photosphereId}`,
        thumbnail: thumbnailFilepaths,
        photosphereAssetsKey: MARZIPANO_ASSET_KEY_PREFIX
      }
    };
  };

  uploadToS3 = async function(s3Path, bucketName, s3KeyBase, keyPrefix) {
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
        // Skip the thumbnail file. It will be archived to glacier instead
        if (!isThumbnailFile(filepath)) {
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

const isThumbnailFile = filepath => {
  const split = filepath.split("/");
  return split[split.length - 1] === "thumbnail.jpg";
};
