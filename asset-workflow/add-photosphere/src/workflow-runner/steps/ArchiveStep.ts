import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";
import { mediaArchiveBucket } from "../../config/aws";
import { S3 } from "aws-sdk";

export default class ArchiveStep extends WorkflowStep {
  name = WorkflowSteps.ARCHIVE;

  execute = async () => {
    const s3 = new S3();

    const key = `${this.context.ownerId}/${this.context.photosphereId}/${this.context.marzipanoKey}.zip`;

    await s3
      .copyObject({
        CopySource: `${this.context.zipUrl.bucket}/${this.context.zipUrl.key}`,
        Bucket: mediaArchiveBucket,
        Key: key,
        StorageClass: "DEEP_ARCHIVE"
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
