import React, { useEffect } from "react";
import * as Uppy from "@uppy/core";
import useUploadedFilesState, {
  FileUploadState,
  FileType
} from "./useUploadedFilesState";
import { CreatePhotoRequest } from "~/rgb-commons/types/api";
import UploadNavBar from "~/components/profile/media/upload/UploadNavBar";
import { MediaType } from "~/rgb-commons/types/media";
import UppyWrapper from "../UppyWrapper";
import getUploadParameters from "~/components/profile/media/upload/getUploadParameters";
import AwsS3 from "@uppy/aws-s3";

const uppy = new Uppy.Uppy({ autoProceed: true });
uppy.use(AwsS3, { getUploadParameters });

const allFilesAreUploaded = (
  filePrefix: string,
  uploadedFiles: FileUploadState
) => {
  if (
    uploadedFiles[filePrefix].fileTypes.includes(FileType.RAW) &&
    uploadedFiles[filePrefix].fileTypes.includes(FileType.LIGHTROOM_METADATA) &&
    uploadedFiles[filePrefix].fileTypes.includes(FileType.JPEG)
  ) {
    return true;
  } else {
    return false;
  }
};

const save = (request: CreatePhotoRequest) =>
  fetch(`/api/media/photos`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

/*
    UploadPhotos manages adding photos to charliemcgrady.com

    Multiple files are associated with each photo (Lightroom metadata, original RAWs, etc.).
    The files are archived alongside the JPG which is processed for web viewing.
    
    UploadPhotos needs to wait for all of the files for a photo to upload prior to
    triggering a save on the server. This is currently determined as when Lightroom XMPs,
    JPEG, and the RAW files have been uploaded. If partial file-bundles are uploaded (e.g.
    only the JPEG), UploadPhoto will wait until all files have uploaded before triggering
    the save.

    There are a couple of assumptions for file uploads:
        1. Files with the same prefix are correlated (e.g. 1.xmp -> 1.jpg are the same image).
        2. Grouped files are uploaded at the same time.
        3. The same file will not be uploaded twice in a row. 
    
    When uploading files, make sure to include Lightroom XMPs, JPEG, and RAW files if possible.
*/
const UploadPhotos = () => {
  const [processingFiles, setProcessingFiles] = React.useState(
    [] as Array<string>
  );
  const [uploadedFiles, setUploadedFiles] = useUploadedFilesState();

  const saveIfAllFilesAreUploaded = (prefix: string) => {
    if (
      allFilesAreUploaded(prefix, uploadedFiles) &&
      !processingFiles.includes(prefix)
    ) {
      save(uploadedFiles[prefix].request);
      setProcessingFiles([prefix, ...processingFiles]);
    }
  };

  const saveRemainingFiles = () => {
    Object.keys(uploadedFiles).map(prefix => {
      if (
        !allFilesAreUploaded(prefix, uploadedFiles) &&
        uploadedFiles[prefix].fileTypes.includes(FileType.JPEG)
      ) {
        save(uploadedFiles[prefix].request);
        setProcessingFiles([prefix, ...processingFiles]);
      }
    });
  };

  useEffect(
    () => {
      uppy.on("upload-success", (file: Uppy.UppyFile) =>
        setUploadedFiles(file.name, file.extension)
      );
      uppy.on("complete", saveRemainingFiles);
    },
    // uppy.on will set up a new event listener every time it is called
    // Make sure it's only called once so we don't end up with duplicate file entries
    []
  );

  Object.keys(uploadedFiles).map(saveIfAllFilesAreUploaded);

  return (
    <UploadNavBar type={MediaType.PHOTO}>
      <UppyWrapper uppy={uppy} />
    </UploadNavBar>
  );
};

export default UploadPhotos;
