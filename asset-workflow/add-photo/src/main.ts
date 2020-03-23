import runWorkflow from "./workflow-runner";
import { ProcessPhotoEvent } from "./rgb-commons/types/workflow";

exports.handler = async (event: ProcessPhotoEvent): Promise<any> => {
  console.log("Beginning the workflow for event: ", JSON.stringify(event));

  await runWorkflow(event);

  return { statusCode: 200 };
}
