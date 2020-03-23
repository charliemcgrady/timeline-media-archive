import { SignMediaRequest, SignMediaResponse } from "~/rgb-commons/types/api";
import { AwsS3UploadParameters } from "@uppy/aws-s3";
import * as Uppy from "@uppy/core";

export default async (
  // The data field for Uppy can be either a Blob or File. Cast to File, since that's
  // what we are dealing with.
  input: Uppy.UppyFile & { data: File }
): Promise<AwsS3UploadParameters> => {
  const response = await fetch(`/api/media/signedS3Url`, {
    method: "POST",
    body: JSON.stringify({
      filename: input.data.name,
      contentType: input.meta.type
    } as SignMediaRequest),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  const parsedResponse = (await response.json()) as SignMediaResponse;

  return {
    url: parsedResponse.url,
    method: "PUT",
    headers: input.meta.type
      ? {
          "Content-Type": input.meta.type
        }
      : {}
  };
};
