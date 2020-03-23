import { WorkflowContext, WorkflowDynamoItem, WorkflowAssetTypes, PersistedWorkflowContext } from './types';

export default abstract class WorkflowStep {
  abstract name: string;
  context: WorkflowContext;

  constructor(p: WorkflowContext) {
    this.context = p;
  }

  // The new context is returned after each step is executed
  abstract async execute(): Promise<WorkflowContext>;

  serialize(): WorkflowDynamoItem {
    // Filter out the jpgBuffer to avoid Dynamo item limits. If a workflow is re-run for
    // the same photo, the runner will need to re-fetch the image.
    let persistedContext = {};
    Object.keys(this.context).map(key => {
      if (key !== "jpgBuffer") persistedContext[key] = this.context[key];
    })

    return {
      "asset_id": this.context.photoId,
      "type": WorkflowAssetTypes.PHOTO,
      "step": this.name,
      "owner_id": this.context.ownerId,
      "last_modified": new Date().toUTCString(),
      "context": persistedContext as PersistedWorkflowContext
    }
  };
};