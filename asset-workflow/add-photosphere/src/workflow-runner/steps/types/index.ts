import {
  S3Url,
  PhotoFilePaths,
  PhotosphereFilePaths,
  ColorInfo,
  Media,
  Archives
} from "../../../rgb-commons/types/media";

export enum WorkflowAssetTypes {
  PHOTOSPHERE = "PHOTOSPHERE"
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
  photosphereId: string;
  ownerId: string;
  zipUrl: S3Url;
  marzipanoKey: string;
  thumbnailFilePaths?: PhotoFilePaths;
  marzipanoFilePaths?: PhotosphereFilePaths;
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
