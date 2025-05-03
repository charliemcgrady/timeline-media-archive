import { useState } from "react";
import { CreatePhotoRequest } from '~/rgb-commons/types/api';

export enum FileType {
  RAW = "RAW",
  LIGHTROOM_METADATA = "LIGHTROOM_METADATA",
  JPEG = "JPEG",
  OTHER = "OTHER"
}
export type FileUploadState = {
  [filenamePrefix: string]: {
    request: CreatePhotoRequest,
    fileTypes: Array<FileType>;
  }
}

export default () => {
  const [uploadState, setUploadState] = useState({} as FileUploadState);

  const addFile = (filename: string, extension: string) => {
    setUploadState(insertFile(filename, extension, uploadState));
  };

  return [uploadState, addFile] as const
};

const insertFile = (filename: string, extension: string, state: FileUploadState): FileUploadState => {
  const prefix = getFilenamePrefix(filename);
  const type = getFileType(extension);
  if (!state[prefix]) {
    state[prefix] = {
      request: {
        originalFiles: [{
          key: filename,
          filename: filename
        }],
        primaryJpegUrlKey: `${prefix}jpg`
      },
      fileTypes: [type]
    };
  } else {
    state[prefix].request.originalFiles = [
      {
        key: filename,
        filename: filename
      },
      ...state[prefix].request.originalFiles
    ]
    state[prefix].fileTypes.push(type);
  }

  return { ...state };
}

const getFilenamePrefix = (filename: string): string => {
  const splitName = filename.split('.');
  let filenamePrefix = "";
  splitName.map((segment: string, i: number) => {
    if (i !== splitName.length - 1) {
      filenamePrefix += segment + '.';
    }
  });
  return filenamePrefix;
}

const getFileType = (extension: string): FileType => {
  switch (extension.toLowerCase()) {
    case "jpeg":
      return FileType.JPEG;
    case "jpg":
      return FileType.JPEG;
    case "arw":
      return FileType.RAW;
    case "raf":
      return FileType.RAW;
    case "xmp":
      return FileType.LIGHTROOM_METADATA;
    default:
      return FileType.OTHER;
  }
};
