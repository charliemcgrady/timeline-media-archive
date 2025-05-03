import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";
import { S3 } from "aws-sdk";
import { tempMediaBucket } from "../../config/aws";

export default class CleanupStep extends WorkflowStep {
  name = WorkflowSteps.CLEANUP;

  execute = async () => {
    const s3 = new S3();
    await Promise.all(
      this.context.originalFiles.map(url =>
        s3
          .deleteObject({
            Bucket: tempMediaBucket,
            Key: url.key
          })
          .promise()
      )
    );

    return this.context;
  };
}
