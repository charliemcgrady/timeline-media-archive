import runWorkflow from "./workflow-runner";
import { ProcessPhotosphereEvent } from "./rgb-commons/types/workflow";

exports.handler = async (event: ProcessPhotosphereEvent): Promise<any> => {
  console.log("Beginning the workflow for event: ", JSON.stringify(event));

  await runWorkflow(event);

  return { statusCode: 200 };
};
