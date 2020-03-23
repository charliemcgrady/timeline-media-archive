import knexProvider from "../../shared/knexProvider";
import { mediaLocationsSchema } from "../../db/schema";
import { locationToLocationDB } from "../../db/transformers";
import insertOrUpdateItem from "../../db/util/insertOrUpdateItem";
import { Location } from "../../rgb-commons/types/media";

export const saveLocations = async (locations: Array<Location>) => {
  await knexProvider.get().transaction(async trx => {
    for (let i = 0; i < locations.length; i++) {
      await insertOrUpdateItem(
        locations[i].id,
        locationToLocationDB(locations[i]),
        mediaLocationsSchema,
        trx
      );
    }
  });
};
