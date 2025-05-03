import Knex from "knex";
import {
  mediaSchema,
  mediaLocationsSchema,
  PhotoLocationFields
} from "../schema";

exports.up = async (knex: Knex) => {
  const fields = mediaLocationsSchema.getFields() as PhotoLocationFields;

  // prettier-ignore
  await knex.raw(`
    BEGIN;
      CREATE TYPE media_location_perspective AS ENUM ('SUBJECT', 'LOCATION_OF_CAPTURE');
      CREATE TABLE IF NOT EXISTS ${mediaLocationsSchema.getTable()} (
        ${fields.id} text PRIMARY KEY,
        ${fields.mediaId} text NOT NULL REFERENCES ${mediaSchema.getTable()}(id) ON DELETE CASCADE,
        ${fields.coordinates} geography(POINT, 4326) NOT NULL,
        ${fields.type} media_location_perspective NOT NULL,
        ${fields.rotation} decimal,
        CONSTRAINT valid_point_location CHECK (st_srid(${fields.coordinates}) = 4326),
        CONSTRAINT valid_rotation CHECK (${fields.rotation} >= 0 AND ${fields.rotation} <= 360));
    COMMIT;
  `);
};

exports.down = async () => {};
