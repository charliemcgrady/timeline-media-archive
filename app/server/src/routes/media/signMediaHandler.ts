import { S3 } from "aws-sdk";
import { tempMediaBucket } from "../../config/aws";
import { SignMediaResponse, SignMediaRequest } from "rgb-commons/types/api";

export const signMedia = (input: SignMediaRequest): SignMediaResponse => {
  const s3 = new S3();
  const key = `${input.filename}`;

  const url = s3.getSignedUrl("putObject", {
    Bucket: tempMediaBucket,
    Key: key,
    ContentType: input.contentType,
    Body: "",
    Expires: 86400
  });

  return {
    filename: input.filename,
    url,
    key,
    bucket: tempMediaBucket
  };
};
