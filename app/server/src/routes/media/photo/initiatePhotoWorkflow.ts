import { Lambda } from "aws-sdk";
import { addPhotoLambda, tempMediaBucket } from "../../../config/aws";
import { CreatePhotoRequest } from "../../../rgb-commons/types/api";
import { ProcessPhotoEvent } from "../../../rgb-commons/types/workflow";
import {
  generatePhotoId,
  getDefaultUserId
} from "../../../rgb-commons/uuidFactory";

export const createPhoto = async (input: CreatePhotoRequest) => {
  const ownerId = getDefaultUserId();
  const photoId = generatePhotoId();
  await invokeWorkflow({
    photoId: photoId,
    primaryJpegUrl: {
      key: input.primaryJpegUrlKey,
      bucket: tempMediaBucket
    },
    originalFiles: input.originalFiles.map(file => ({
      bucket: tempMediaBucket,
      ...file
    })),
    ownerId: ownerId
  });
  return { photoId: photoId };
};

const invokeWorkflow = async (event: ProcessPhotoEvent) => {
  const lambda = new Lambda();
  const params: Lambda.InvocationRequest = {
    FunctionName: addPhotoLambda,
    InvocationType: "Event",
    Payload: JSON.stringify(event)
  };

  return lambda.invoke(params).promise();
};
