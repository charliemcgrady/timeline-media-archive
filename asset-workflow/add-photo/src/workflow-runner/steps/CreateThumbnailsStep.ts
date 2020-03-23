import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";
import createThumbnailsAndUploadToS3 from "../../rgb-commons/workflow/createThumbnailsAndUploadToS3";

export default class CreateThumbnailsStep extends WorkflowStep {
  name = WorkflowSteps.CREATE_THUMBNAILS;

  execute = async () => {
    this.context.filepaths = await createThumbnailsAndUploadToS3(
      this.context.jpgBuffer,
      this.context.photoId,
      this.context.ownerId
    );
    return this.context;
  };
}
