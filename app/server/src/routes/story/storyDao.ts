import { StoryConfig } from "../../rgb-commons/types/story-config";
import {
  generateStoryId,
  getDefaultUserId
} from "../../rgb-commons/uuidFactory";
import knexProvider from "../../shared/knexProvider";
import { storiesSchema, mediaSchema } from "../../db/schema";
import { WidgetConfig, WidgetType } from "../../rgb-commons/types/widgets";
import { RequiredMediaConfig } from "../../rgb-commons/types/widgets/media-grid";
import { SupportedMediaType } from "../../rgb-commons/types/widgets/supported-media-types";

const ownerId = getDefaultUserId();

export const create = async (title: string): Promise<StoryConfig> => {
  const id = generateStoryId();

  await knexProvider
    .get()(storiesSchema.getTable())
    .insert({
      title,
      id,
      owner_id: ownerId,
      date_created: new Date().toUTCString(),
      last_modified: new Date().toUTCString(),
      widgets: {}
    });

  return {
    id,
    title,
    media: {},
    widgets: []
  };
};

export const put = async (config: StoryConfig): Promise<StoryConfig> => {
  await knexProvider
    .get()(storiesSchema.getTable())
    .where({ id: config.id })
    .update({
      title: config.title,
      widgets: config.widgets,
      last_modified: new Date().toUTCString()
    });

  return config;
};

export const getAll = async (): Promise<Array<StoryConfig>> => {
  const rows = await knexProvider
    .get()(storiesSchema.getTable())
    .where({ owner_id: ownerId });

  const stories: Array<StoryConfig> = [];
  for (let i = 0; i < rows.length; i++) {
    const media = await getMediaForStories(rows[i].widgets);
    stories.push({
      id: rows[i].id,
      title: rows[i].title,
      widgets: rows[i].widgets,
      media: media
    });
  }

  return stories;
};

export const get = async (id: string): Promise<StoryConfig | undefined> => {
  const row = await knexProvider
    .get()(storiesSchema.getTable())
    .where({ owner_id: ownerId, id });

  if (row.length === 0) {
    return undefined;
  } else {
    return {
      id,
      title: row[0].title,
      widgets: row[0].widgets,
      media: await getMediaForStories(row[0].widgets)
    };
  }
};

// Ultimately, we want to create a map which contains only the media information needed to
// render the story. If media shows up in two widgets (e.g. map and media grid), make
// sure to fold in new information so we have everything needed to render the widget.
const getMediaForStories = async (
  widgets: Array<WidgetConfig>
): Promise<Record<string, RequiredMediaConfig>> => {
  const photoMedia: { [id: string]: RequiredMediaConfig } = {};

  const photos: Array<{ id: string; type: WidgetType }> = [];
  widgets.forEach((widget: WidgetConfig) => {
    if (widget.media) {
      widget.media.forEach(media => {
        photos.push({ id: media.id, type: widget.type });
      });
    }
  });

  const photoRowsMap: any = {};
  const photoRows = await knexProvider
    .get()(mediaSchema.getTable())
    .whereIn(
      "id",
      photos.map(photo => photo.id)
    );
  photoRows.forEach(row => {
    photoRowsMap[row.id] = row;
  });

  photos.forEach(photo => {
    const dbRow = photoRowsMap[photo.id];

    if (!dbRow) {
      console.error(`Unable to find ${photo.id} in the db`);
      return;
    }

    photoMedia[photo.id] = {
      id: photo.id,
      dominantColorHex: dbRow.dominant_color_hex,
      width: dbRow.width,
      height: dbRow.height,
      type: SupportedMediaType.Photo
    };
  });

  return photoMedia;
};
