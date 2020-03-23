import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";
import { mediaArchiveBucket } from "../../config/aws";
import { S3 } from "aws-sdk";

export default class ArchiveStep extends WorkflowStep {
  name = WorkflowSteps.ARCHIVE;

  execute = async () => {
    const s3 = new S3();

    const key = filename =>
      `${this.context.ownerId}/${this.context.photoId}/${filename}`;

    console.log(
      "Beginning Archive step with originFiles:\n ",
      JSON.stringify(this.context.originalFiles)
    );
    for (let i = 0; i < this.context.originalFiles.length; i++) {
      const url = this.context.originalFiles[i];
      console.log(`Copying ${url.filename} to archive bucket`);
      await s3
        .copyObject({
          CopySource: `${url.bucket}/${url.key}`,
          Bucket: mediaArchiveBucket,
          Key: key(url.filename),
          StorageClass: "DEEP_ARCHIVE"
        })
        .promise();
      console.log("Sucessfully archived");
    }

    const archivedFileUrls = this.context.originalFiles.map(url => ({
      bucket: mediaArchiveBucket,
      key: key(url.filename)
    }));

    this.context.archives = {
      s3ArchivedFileUrls: archivedFileUrls,
      ...this.context.archives
    };

    return this.context;
  };
}
