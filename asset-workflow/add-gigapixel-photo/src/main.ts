import runWorkflow from "./workflow-runner";
import { ProcessGigalpixelPhotoEvent } from "./rgb-commons/types/workflow";

exports.handler = async (event: ProcessGigalpixelPhotoEvent): Promise<any> => {
  console.log("Beginning the workflow for event: ", JSON.stringify(event));

  await runWorkflow(event);

  return { statusCode: 200 };
};
