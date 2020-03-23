import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";

export default class PendingProcessingStep extends WorkflowStep {
  name = WorkflowSteps.PENDING_PROCESSING;

  // No Op... This step is the first step
  execute = async () => {
    return this.context;
  };
}
