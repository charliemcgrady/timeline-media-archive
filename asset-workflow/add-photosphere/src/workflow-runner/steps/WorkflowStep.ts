import {
  WorkflowContext,
  WorkflowDynamoItem,
  WorkflowAssetTypes,
  PersistedWorkflowContext
} from "./types";

export default abstract class WorkflowStep {
  abstract name: string;
  context: WorkflowContext;

  constructor(p: WorkflowContext) {
    this.context = p;
  }

  // The new context is returned after each step is executed
  abstract async execute(): Promise<WorkflowContext>;

  serialize(): WorkflowDynamoItem {
    let persistedContext = {};
    Object.keys(this.context).map(key => {
      persistedContext[key] = this.context[key];
    });

    return {
      asset_id: this.context.photosphereId,
      type: WorkflowAssetTypes.PHOTOSPHERE,
      step: this.name,
      owner_id: this.context.ownerId,
      last_modified: new Date().toUTCString(),
      context: persistedContext as PersistedWorkflowContext
    };
  }
}
