import { StoryConfig } from "./story-config";
import { WidgetConfig, WidgetType } from "./widgets";
import {
  MediaType,
  Media,
  Location,
  MediaLocationMap,
  MediaMap
} from "./media";
import { Tag, TagEdge, TagMap } from "./tags";

const throwError = (field: string, input: any) => {
  throw new Error(`No ${field} provided: ${JSON.stringify(input)}`);
};

// SerializedObject is an abstract class intended for objects which are serialized
// and deserialized over the wire. Since typescript only checks for errors
// during compilation, we need to do runtime validation (especially prior
// to saving models to the database).
export abstract class SerializedObject {
  abstract validateOrThrow(input: any): void;
  constructor(input: any) {
    this.validateOrThrow(input);
  }
}

export class CreateStoryRequest extends SerializedObject {
  private title: string;
  getTitle(): string {
    return this.title;
  }

  validateOrThrow(input: any) {
    if (!input.title || typeof input.title !== "string") {
      throw new Error(`No title provided: ${JSON.stringify(input)}`);
    }
  }

  constructor(input: any) {
    super(input);
    this.title = input.title;
  }
}

export class SyncTagsRequest extends SerializedObject {
  private tagsToDelete: Array<Tag>;
  private tagsToAddOrUpdate: Array<Tag>;
  private tagEdgesToDelete: Array<TagEdge>;
  private tagEdgesToAddOrUpdate: Array<TagEdge>;

  getTagsToDelete(): Array<Tag> {
    return this.tagsToDelete;
  }

  getTagsToAddOrUpdate(): Array<Tag> {
    return this.tagsToAddOrUpdate;
  }

  getTagEdgesToDelete(): Array<TagEdge> {
    return this.tagEdgesToDelete;
  }

  getTagEdgesAddOrUpdate(): Array<TagEdge> {
    return this.tagEdgesToAddOrUpdate;
  }

  validateOrThrow(input: any) {
    if (!Array.isArray(input.tagsToDelete)) {
      throwError("tagsToDelete", input);
    }
    if (!Array.isArray(input.tagsToAddOrUpdate)) {
      throwError("tagsToAddOrUpdate", input);
    }
    if (!Array.isArray(input.tagEdgesToDelete)) {
      throwError("tagEdgesToDelete", input);
    }
    if (!Array.isArray(input.tagEdgesToAddOrUpdate)) {
      throwError("tagEdgesToAddOrUpdate", input);
    }
  }

  constructor(input: any) {
    super(input);
    this.tagsToDelete = input.tagsToDelete;
    this.tagsToAddOrUpdate = input.tagsToAddOrUpdate;
    this.tagEdgesToDelete = input.tagEdgesToDelete;
    this.tagEdgesToAddOrUpdate = input.tagEdgesToAddOrUpdate;
  }
}

export class SerializedStory extends SerializedObject {
  private config: StoryConfig;
  getConfig(): StoryConfig {
    return this.config;
  }

  // This validation could be better - we really should be strictly validating the widgets
  // objects. Alas, we're using JS and stuck with Typescript instead of something like Jackson.
  // For now, assume the widgets objects are properly formed because they're created by TS.
  validateOrThrow(input: any) {
    if (!input.id || typeof input.id !== "string") {
      throwError("id", input);
    } else if (!input.title || typeof input.title !== "string") {
      throwError("title", input);
    } else if (!input.widgets) {
      throwError("widgets", input);
    }

    input.widgets.forEach((widget: WidgetConfig) => {
      if (!widget.id || typeof widget.id !== "string") {
        throwError("widgets / id", input);
      }
      if (!widget.type || !Object.values(WidgetType).includes(widget.type)) {
        throwError("widgets / type", input);
      }
      if (!widget.metadata) {
        throwError("widgets / metadata", input);
      }
    });
  }

  constructor(input: any, id: string) {
    super(input);
    this.config = { ...input, id };
  }
}

export type CreatePhotoRequest = {
  // The key of the photo in the temp media bucket
  primaryJpegUrlKey: string;

  // Any additional URLs which should be archived alongside the photos (e.g. RAW files)
  originalFiles: Array<{ filename: string; key: string }>;
};

export type CreatePhotosphereRequest = {
  // The key of the photo in the temp media bucket
  zipUrlKey: string;

  // The string applied to the asset by the Marzipano tool
  marzipanoKey: string;
};

export type CreateGigapixelPhotoRequest = {
  // The key of the gigapixel photo in the temp media bucket
  zipUrlKey: string;

  // The string applied when generating the gigapixel assets
  gigapixelKey: string;
};

export type SaveMediaRequest = {
  // Allow saving of specific fields without requiring the entire object to be passed in.
  media: Partial<Media> & SaveMediaRequiredFields;

  // Allow saving of media locations without a separate API call.
  locations?: Array<Location>;
};

export type SaveMediaRequiredFields = {
  // Provide an index signature for writing to the database. Since this object
  // is serialized JSON, the keys will all be strings
  [x: string]: any;

  // ownerId, type, and mediaId should always be provided.
  ownerId: string;
  id: string;
  type: MediaType;
};

export type SignMediaRequest = {
  filename: string;
  contentType: string;
};

export type GetTagsResponse = {
  tagEdges: Array<TagEdge>;
  tagMap: TagMap;
};

export type SignMediaResponse = {
  filename: string;
  url: string;
  bucket: string;
  key: string;
};

export type GetMediaResponse = {
  mediaLocationMap: MediaLocationMap;
  mediaMap: MediaMap;
  mediaOrder: Array<string>;
  error?: string;
};
