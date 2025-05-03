import { Lambda } from "aws-sdk";
import { addGigapixelPhotoLambda, tempMediaBucket } from "../../../config/aws";
import { CreateGigapixelPhotoRequest } from "../../../rgb-commons/types/api";
import { ProcessGigalpixelPhotoEvent } from "../../../rgb-commons/types/workflow";
import {
  generateGigapixelPhotoId,
  getDefaultUserId
} from "../../../rgb-commons/uuidFactory";

export const createGigapixelPhoto = async (
  input: CreateGigapixelPhotoRequest
) => {
  const ownerId = getDefaultUserId();
  const gigapixelId = generateGigapixelPhotoId();
  await invokeWorkflow({
    gigapixelId: gigapixelId,
    gigapixelKey: input.gigapixelKey,
    zipUrl: {
      key: input.zipUrlKey,
      bucket: tempMediaBucket
    },
    ownerId: ownerId
  });
  return { gigapixelId: gigapixelId };
};

const invokeWorkflow = async (event: ProcessGigalpixelPhotoEvent) => {
  const lambda = new Lambda();
  const params: Lambda.InvocationRequest = {
    FunctionName: addGigapixelPhotoLambda,
    InvocationType: "Event",
    Payload: JSON.stringify(event)
  };

  return lambda.invoke(params).promise();
};
