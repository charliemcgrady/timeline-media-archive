import { WorkflowDynamoItem } from "./steps/types";
import { workflowTable } from "../config/aws";
import WorkflowStep from "./steps/WorkflowStep";
import { DynamoDB, S3 } from "aws-sdk";
import { S3Url } from "../rgb-commons/types/media";
import fs from "fs";
import unzipper from "unzipper";

export const GIGAPIXEL_DIR = "/tmp";

export const getOriginalPath = gigapixelKey =>
  `${GIGAPIXEL_DIR}/${gigapixelKey}/${gigapixelKey}.jpg`;

export const getContext = async (
  photoSphereId: string
): Promise<WorkflowDynamoItem | undefined> => {
  const dynamo = new DynamoDB();
  const response = await dynamo
    .getItem({
      TableName: workflowTable,
      Key: {
        asset_id: { S: photoSphereId }
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

export const downloadAndExtractZip = async (
  zipUrl: S3Url,
  gigapixelId: string,
  gigapixelKey: string
): Promise<void> => {
  const targetFile = `${GIGAPIXEL_DIR}/${gigapixelId}.zip`;

  !fs.existsSync(GIGAPIXEL_DIR) && fs.mkdirSync(GIGAPIXEL_DIR);

  const zipBuffer = await downloadFile(zipUrl);

  fs.writeFileSync(targetFile, zipBuffer);

  await extractAssets(targetFile, GIGAPIXEL_DIR);

  validateZipContents(gigapixelKey);
};

export const extractAssets = (targetFile, tempDir) => {
  return new Promise(resolve => {
    fs.createReadStream(targetFile)
      .pipe(unzipper.Extract({ path: tempDir }))
      .on("close", resolve);
  });
};

const validateZipContents = (gigapixelKey: string) => {
  if (!fs.existsSync(getOriginalPath(gigapixelKey))) {
    throw new Error(
      `Unable to find original for the photosphere at ${getOriginalPath(
        gigapixelKey
      )}`
    );
  }
};
