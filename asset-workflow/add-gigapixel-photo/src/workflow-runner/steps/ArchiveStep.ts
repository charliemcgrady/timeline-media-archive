import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";
import { mediaArchiveBucket } from "../../config/aws";
import { S3 } from "aws-sdk";
import { getOriginalPath } from "../../workflow-runner/workflowDao";
const sharp = require("sharp");

export default class ArchiveStep extends WorkflowStep {
  name = WorkflowSteps.ARCHIVE;

  execute = async () => {
    const s3 = new S3();

    const key = `${this.context.ownerId}/${this.context.gigapixelId}/${this.context.gigapixelKey}.jpg`;

    const jpgBuffer = await sharp(
      getOriginalPath(this.context.gigapixelKey)
    ).toBuffer();

    await s3
      .putObject({
        Body: jpgBuffer,
        Bucket: mediaArchiveBucket,
        Key: key
        // StorageClass: "DEEP_ARCHIVE"
      })
      .promise();

    const archivedFileUrls = [
      {
        bucket: mediaArchiveBucket,
        key: key
      }
    ];

    this.context.archives = {
      s3ArchivedFileUrls: archivedFileUrls,
      ...this.context.archives
    };

    return this.context;
  };
}
