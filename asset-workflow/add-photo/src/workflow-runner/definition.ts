import { WorkflowSteps } from "./steps/types";

const workflowDefinition: Array<string> = [
  WorkflowSteps.PENDING_PROCESSING.valueOf(),
  WorkflowSteps.CREATE_THUMBNAILS.valueOf(),
  WorkflowSteps.PARSE_EXIF.valueOf(),
  WorkflowSteps.PROCESS_WITH_GVISION.valueOf(),
  WorkflowSteps.ARCHIVE.valueOf(),
  WorkflowSteps.SAVE.valueOf(),
  WorkflowSteps.CLEANUP.valueOf(),
  WorkflowSteps.COMPLETED.valueOf()
];

export default workflowDefinition;