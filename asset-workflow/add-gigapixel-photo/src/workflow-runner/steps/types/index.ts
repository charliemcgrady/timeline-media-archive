import {
  S3Url,
  GigalpixelFilePaths,
  ColorInfo,
  Media,
  Archives
} from "../../../rgb-commons/types/media";

export enum WorkflowAssetTypes {
  GIGAPIXEL_PHOTO = "GIGAPIXEL_PHOTO"
}

export enum WorkflowSteps {
  PENDING_PROCESSING = "PENDING_PROCESSING",
  UPLOAD_TO_S3 = "UPLOAD_TO_S3",
  PROCESS_WITH_GVISION = "PROCESS_WITH_GVISION",
  PARSE_EXIF = "PARSE_EXIF",
  ARCHIVE = "ARCHIVE",
  SAVE = "SAVE",
  CLEANUP = "CLEANUP",
  COMPLETED = "COMPLETED"
}

// Add any info which shouldn't be persisted here
export type WorkflowContext = PersistedWorkflowContext;

export type PersistedWorkflowContext = Partial<Media> & {
  gigapixelId: string;
  ownerId: string;
  zipUrl: S3Url;
  gigapixelKey: string;
  gigapixelFilepaths?: GigalpixelFilePaths;
  colors?: Array<ColorInfo>;
  dominantColorHex?: string;
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
