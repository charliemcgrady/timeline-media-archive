import {
  FilePaths,
  Exif,
  ColorInfo,
  GCPVisionTag,
  Media,
  ArchiveUrl,
  Archives
} from "../../../rgb-commons/types/media";
import { AnnotateImageResponse } from "../../../rgb-commons/types/vision-api";

export enum WorkflowAssetTypes {
  PHOTO = "PHOTO"
}

export enum WorkflowSteps {
  ARCHIVE = "ARCHIVE",
  PARSE_EXIF = "PARSE_EXIF",
  PROCESS_WITH_GVISION = "PROCESS_WITH_GVISION",
  PENDING_PROCESSING = "PENDING_PROCESSING",
  CREATE_THUMBNAILS = "CREATE_THUMBNAILS",
  SAVE = "SAVE",
  CLEANUP = "CLEANUP",
  COMPLETED = "COMPLETED"
}

export type WorkflowContext = PersistedWorkflowContext & {
  // Add the working image to the context; it is used for many steps
  jpgBuffer: Buffer;
};

// Two things of note:
//   1. After the photosphere workflow has run, normally optional fields like backups are required.
//   2. Filter out locations because they are not provided prior to photo uploads.
export type PhotoAfterInitialProcessing = Omit<Required<Media>, "locations">;

export type PersistedWorkflowContext = {
  // The jpgBuffer is not persisted to avoid Dynamo item limits
  photoId: string;
  ownerId: string;
  originalFiles: Array<ArchiveUrl>;
  filepaths?: FilePaths;
  dateTaken?: string;
  dominantColorHex?: string;
  colors?: Array<ColorInfo>;
  tags?: Array<GCPVisionTag>;
  exif?: Exif;
  width?: number;
  height?: number;
  archives?: Archives;
};

export type WorkflowDynamoItem = {
  asset_id: string;
  type: WorkflowAssetTypes;
  step: string;
  owner_id: string;
  last_modified: string;
  context: PersistedWorkflowContext;
};
