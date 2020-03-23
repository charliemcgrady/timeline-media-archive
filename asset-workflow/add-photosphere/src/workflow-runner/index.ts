import {
  WorkflowSteps,
  WorkflowContext,
  WorkflowDynamoItem
} from "./steps/types";
import WorkflowStep from "./steps/WorkflowStep";
import { ProcessPhotosphereEvent } from "../rgb-commons/types/workflow";
import workflowDefinition from "./definition";
import { getContext, saveContext, downloadAndExtractZip } from "./workflowDao";
import UploadToS3Step from "./steps/UploadToS3Step";
import CompletedStep from "./steps/CompletedStep";
import PendingProcessingStep from "./steps/PendingProcessingStep";
import ProcessWithGVisionStep from "./steps/ProcessWithGVisionStep";
import ArchiveStep from "./steps/ArchiveStep";
import SaveStep from "./steps/SaveStep";
import ParseExifStep from "./steps/ParseExifStep";
import CleanupStep from "./steps/CleanupStep";

export default async (event: ProcessPhotosphereEvent) => {
  console.log("Beggining workflow for " + event.photosphereId);

  let nextStep = await getInitialStep(event);

  console.log(JSON.stringify(nextStep));
  let stepIndex = workflowDefinition.indexOf(nextStep.name);

  if (stepIndex === -1) {
    throw new Error("Undefined step index in photosphere processing workflow");
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
};

const getInitialStep = async (
  event: ProcessPhotosphereEvent
): Promise<WorkflowStep> => {
  // getInitialContext may fail (e.g. if a preview thumbnail is not available)
  // Make sure the item is written to dynamo regardless
  try {
    const { context, step } = await getInitialContext(event);

    if (!step) {
      return new PendingProcessingStep(context);
    } else {
      return getStep(WorkflowSteps[step], context);
    }
  } catch (e) {
    console.log("Error while getting the initial context: ", e);
    await saveContext(new PendingProcessingStep({ ...event }));
    console.log("Exiting the workflow");
    throw e;
  }
};

const getInitialContext = async (
  providedContext: ProcessPhotosphereEvent
): Promise<{ context: WorkflowContext; step: string | undefined }> => {
  await downloadAndExtractZip(
    providedContext.zipUrl,
    providedContext.photosphereId,
    providedContext.marzipanoKey
  );

  const existingWorkflowItem: WorkflowDynamoItem | undefined = await getContext(
    providedContext.photosphereId
  );

  let context: WorkflowContext;
  if (!existingWorkflowItem) {
    context = { ...providedContext };
  } else {
    context = { ...existingWorkflowItem.context };
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
    case WorkflowSteps.UPLOAD_TO_S3.valueOf():
      return new UploadToS3Step(context);
    case WorkflowSteps.PROCESS_WITH_GVISION.valueOf():
      return new ProcessWithGVisionStep(context);
    case WorkflowSteps.ARCHIVE.valueOf():
      return new ArchiveStep(context);
    case WorkflowSteps.PARSE_EXIF.valueOf():
      return new ParseExifStep(context);
    case WorkflowSteps.SAVE.valueOf():
      return new SaveStep(context);
    case WorkflowSteps.CLEANUP.valueOf():
      return new CleanupStep(context);
    case WorkflowSteps.COMPLETED.valueOf():
      return new CompletedStep(context);
    default:
      throw new Error(
        `Unable to find workflow step for\n: Name: ${step}\nMedia: ${context}"`
      );
  }
};
