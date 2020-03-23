import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";
import { S3 } from "aws-sdk";

export default class CleanupStep extends WorkflowStep {
  name = WorkflowSteps.CLEANUP;

  execute = async () => {
    const s3 = new S3();

    await s3
      .deleteObject({
        Bucket: this.context.zipUrl.bucket,
        Key: this.context.zipUrl.key
      })
      .promise();
    return this.context;
  };
}
