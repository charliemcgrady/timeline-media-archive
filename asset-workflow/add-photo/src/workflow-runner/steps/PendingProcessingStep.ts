import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";

export default class PendingProcessingStep extends WorkflowStep {
  name = WorkflowSteps.PENDING_PROCESSING;

  // No Op... This step is the initial step, used for getting the pending workflow into Dynamo.
  execute = async () => { return this.context };
};