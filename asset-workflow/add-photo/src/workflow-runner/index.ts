import { WorkflowSteps, WorkflowContext, WorkflowDynamoItem } from "./steps/types";
import WorkflowStep from './steps/WorkflowStep';
import PendingProcessingStep from './steps/PendingProcessingStep';
import { ProcessPhotoEvent } from "../rgb-commons/types/workflow";
import workflowDefinition from "./definition";
import { getContext, saveContext, downloadFile } from "./workflowDao";
import ParseExifStep from "./steps/ParseExifStep";
import ArchiveStep from "./steps/ArchiveStep";
import ProcessWithGVisionStep from "./steps/vision/ProcessWithGVisionStep";
import SaveStep from "./steps/SaveStep";
import CompletedStep from "./steps/CompletedStep";
import CleanupStep from "./steps/CleanupStep";
import CreateThumbnailsStep from './steps/CreateThumbnailsStep';

export default async (event: ProcessPhotoEvent) => {
  console.log("Beggining workflow for " + event.photoId);

  let nextStep = await getInitialStep(event);
  let stepIndex = workflowDefinition.indexOf(nextStep.name);

  if (stepIndex === -1) {
    throw new Error("Undefined step index in photo processing workflow");
  }

  while (stepIndex < workflowDefinition.length) {
    await saveContext(nextStep);
    const newContext = await nextStep.execute();

    stepIndex++;

    const onFinalStep = stepIndex === workflowDefinition.length;
    if (!onFinalStep) {
      nextStep = getStep(workflowDefinition[stepIndex], newContext);
    }
  }
}

const getInitialStep = async (event: ProcessPhotoEvent): Promise<WorkflowStep> => {
  const { context, step } = await getInitialContext(event);

  if (!step) {
    return new PendingProcessingStep(context)
  } else {
    return getStep(WorkflowSteps[step], context);
  }
}

const getInitialContext = async (
  providedContext: ProcessPhotoEvent
): Promise<{ context: WorkflowContext, step: string | undefined }> => {
  const jpgBuffer = await downloadFile(providedContext.primaryJpegUrl);

  const existingWorkflowItem: WorkflowDynamoItem | undefined = await getContext(providedContext.photoId);

  let context: WorkflowContext;
  if (!existingWorkflowItem) {
    context = { jpgBuffer, ...providedContext };
  } else {
    context = { jpgBuffer, ...existingWorkflowItem.context };
  }

  return {
    context,
    step: existingWorkflowItem ? existingWorkflowItem.step : undefined
  };
};

const getStep = (step: string, context: WorkflowContext): WorkflowStep => {
  switch (step) {
    case WorkflowSteps.PENDING_PROCESSING.valueOf():
      return new PendingProcessingStep(context);
    case WorkflowSteps.CREATE_THUMBNAILS.valueOf():
      return new CreateThumbnailsStep(context);
    case WorkflowSteps.CLEANUP.valueOf():
      return new CleanupStep(context);
    case WorkflowSteps.PARSE_EXIF.valueOf():
      return new ParseExifStep(context);
    case WorkflowSteps.PROCESS_WITH_GVISION.valueOf():
      return new ProcessWithGVisionStep(context);
    case WorkflowSteps.ARCHIVE.valueOf():
      return new ArchiveStep(context);
    case WorkflowSteps.SAVE.valueOf():
      return new SaveStep(context);
    case WorkflowSteps.COMPLETED.valueOf():
      return new CompletedStep(context);
    default:
      throw new Error(`Unable to find workflow step for\n: Name: ${step}\nPhoto: ${context}"`);
  }
}

