import { WorkflowDynamoItem } from "./steps/types";
import { workflowTable } from "../config/aws";
import WorkflowStep from "./steps/WorkflowStep";
import { DynamoDB, S3 } from "aws-sdk";
import { S3Url } from "../rgb-commons/types/media";

export const getContext = async (
  photoId: string
): Promise<WorkflowDynamoItem | undefined> => {
  const dynamo = new DynamoDB();
  const response = await dynamo
    .getItem({
      TableName: workflowTable,
      Key: {
        asset_id: { S: photoId }
      }
    })
    .promise();

  if (!response.Item) {
    return undefined;
  } else {
    return DynamoDB.Converter.unmarshall(response.Item) as WorkflowDynamoItem;
  }
};

export const saveContext = async (step: WorkflowStep) => {
  const dynamo = new DynamoDB();
  const serializedItem = step.serialize();
  // Convert NaN values from exif blobs to nulls before saving to Dynamo.
  // Otherwise, the put will fail.
  const sanitizedItem = JSON.parse(JSON.stringify(serializedItem));

  return dynamo
    .putItem({
      TableName: workflowTable,
      Item: DynamoDB.Converter.marshall(sanitizedItem, {
        convertEmptyValues: true
      })
    })
    .promise();
};

export const downloadFile = async (url: S3Url): Promise<Buffer> => {
  const s3 = new S3();
  const imageDownload = await s3
    .getObject({
      Bucket: url.bucket,
      Key: url.key
    })
    .promise();
  return imageDownload.Body as Buffer;
};
