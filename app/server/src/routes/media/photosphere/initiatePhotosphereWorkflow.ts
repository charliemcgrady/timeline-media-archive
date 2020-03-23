import { Lambda } from "aws-sdk";
import { addPhotosphereLambda, tempMediaBucket } from "../../../config/aws";
import { CreatePhotosphereRequest } from "../../../rgb-commons/types/api";
import { ProcessPhotosphereEvent } from "../../../rgb-commons/types/workflow";
import {
  generatePhotosphereId,
  getDefaultUserId
} from "../../../rgb-commons/uuidFactory";

export const createPhotosphere = async (input: CreatePhotosphereRequest) => {
  const ownerId = getDefaultUserId();
  const photosphereId = generatePhotosphereId();
  await invokeWorkflow({
    photosphereId: photosphereId,
    marzipanoKey: input.marzipanoKey,
    zipUrl: {
      key: input.zipUrlKey,
      bucket: tempMediaBucket
    },
    ownerId: ownerId
  });
  return { photosphereId: photosphereId };
};

const invokeWorkflow = async (event: ProcessPhotosphereEvent) => {
  const lambda = new Lambda();
  const params: Lambda.InvocationRequest = {
    FunctionName: addPhotosphereLambda,
    InvocationType: "Event",
    Payload: JSON.stringify(event)
  };

  return lambda.invoke(params).promise();
};
