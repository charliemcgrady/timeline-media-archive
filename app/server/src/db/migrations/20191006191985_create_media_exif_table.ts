import Knex from "knex";
import { mediaExifSchema, mediaSchema } from "../schema";

exports.up = async (knex: Knex) => {
  const fields = mediaExifSchema.getFields();

  // prettier-ignore
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS ${mediaExifSchema.getTable()} (
      ${fields.id} text PRIMARY KEY REFERENCES ${mediaSchema.getTable()}(id) ON DELETE CASCADE NOT NULL,
      ${fields.focalLength} decimal,
      ${fields.exposureTime} decimal,
      ${fields.cameraModel} text,
      ${fields.cameraMake} text,
      ${fields.lensModel} text,
      ${fields.brightness} decimal,
      ${fields.aperture} decimal,
      ${fields.iso} integer,
      CONSTRAINT valid_focal_length CHECK (${fields.focalLength} >= 0),
      CONSTRAINT valid_exposure_time CHECK (${fields.exposureTime} >= 0),
      CONSTRAINT valid_aperturn CHECK (${fields.aperture} >= 0),
      CONSTRAINT valid_iso CHECK (${fields.iso} > 0)
    );
  `);
};

exports.down = async (knex: Knex) => {
  return knex.schema.dropTable(mediaExifSchema.getTable());
};
