import knexProvider from "../../shared/knexProvider";
import { Media, Location } from "../../rgb-commons/types/media";
import { GetMediaResponse } from "../../rgb-commons/types/api";
import { mediaSchema, mediaLocationsSchema } from "../../db/schema";

export const get = async (): Promise<GetMediaResponse> => {
  const mediaResponse = await knexProvider.get().raw(`
    SELECT * FROM ${mediaSchema.getTable()} ORDER BY date_taken DESC;
  `);

  const medias: Array<Media> = mediaResponse.rows.map((row: any) => {
    const media: any = {};
    // Rows are stored in snake_case in the db, but are camelCase in JS objects.
    // Convert them for the JS based on the defined schemas
    Object.keys(mediaSchema.getFields()).forEach((field: string) => {
      const snakeCaseFieldName = mediaSchema.getFields()[field];
      // We are currently programatically determining the filepath of a photo.
      // filepaths is a large field which we filter to save on bandwidth.
      // filepaths is the single source of truth in case we ever change schemas,
      // need to do migrations, etc.
      if (field !== "filepaths") {
        media[field] = row[snakeCaseFieldName];
      }
    });
    return media;
  });

  let mediaMap: { [mediaId: string]: Media } = {};
  medias.forEach(media => {
    mediaMap[media.id] = media;
  });
  const mediaOrder = medias.map(m => m.id);

  const mediaLocationMap: { [locationId: string]: Location } = {};
  const mediaLocationsResponse = await knexProvider.get().raw(`
    SELECT *, ST_AsText(coordinates) FROM ${mediaLocationsSchema.getTable()};
  `);
  mediaLocationsResponse.rows.forEach((row: any) => {
    if (mediaMap[row.media_id]) {
      // ST_AsText(coordinates) will make a row which looks
      // something like `st_astext: 'POINT(48.4438146709956 -59.5905074218749)'`
      const coordinateString = row.st_astext.substring(
        6, // Trim the `POINT(`
        row.st_astext.length - 1 // Trim the tailing `)`
      );

      mediaLocationMap[row.id] = {
        id: row.id,
        lat: +coordinateString.split(" ")[1],
        lng: +coordinateString.split(" ")[0],
        mediaId: row.media_id
      };
    }
  });

  Object.keys(mediaLocationMap).forEach(id => {
    if (mediaMap[mediaLocationMap[id].mediaId]) {
      mediaMap[mediaLocationMap[id].mediaId].locationId = id;
    }
  });

  return {
    mediaMap,
    mediaOrder,
    mediaLocationMap
  };
};
