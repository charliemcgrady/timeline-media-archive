import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";

export default class CompletedStep extends WorkflowStep {
  name = WorkflowSteps.COMPLETED;

  // No Op... This step is the final step
  execute = async () => { return this.context };
};