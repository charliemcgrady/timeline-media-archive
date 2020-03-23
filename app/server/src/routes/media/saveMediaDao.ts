import { SaveMediaRequiredFields } from "../../rgb-commons/types/api";
import knexProvider from "../../shared/knexProvider";
import {
  mediaSchema,
  mediaExifSchema,
  mediaColorsSchema,
  mediaArchivesSchema
} from "../../db/schema";
import { colorInfoToColorDB, archivesToArchiveDB } from "../../db/transformers";
import insertOrUpdateItem from "../../db/util/insertOrUpdateItem";
import { Media } from "../../rgb-commons/types/media";

export const saveMedia = async (
  media: Partial<Media> & SaveMediaRequiredFields
) => {
  await knexProvider.get().transaction(async trx => {
    await insertOrUpdateItem(media.id, media, mediaSchema, trx);
    if (media.exif) {
      await insertOrUpdateItem(media.id, media.exif, mediaExifSchema, trx);
    }
    if (media.colors) {
      for (let i = 0; i < media.colors.length; i++) {
        await insertOrUpdateItem(
          media.colors[i].id,
          colorInfoToColorDB(media.colors[i], media.id, media.type),
          mediaColorsSchema,
          trx
        );
      }
    }
    if (media.archives) {
      await insertOrUpdateItem(
        media.id,
        archivesToArchiveDB(media.archives),
        mediaArchivesSchema,
        trx
      );
    }
  });
};
