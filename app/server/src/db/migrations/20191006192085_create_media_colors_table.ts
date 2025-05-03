import Knex from "knex";
import { mediaColorsSchema, mediaSchema } from "../schema";

exports.up = async (knex: Knex) => {
  const fields = mediaColorsSchema.getFields();

  // prettier-ignore
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS ${mediaColorsSchema.getTable()} (
      ${fields.id} text PRIMARY KEY,
      ${fields.mediaId} text NOT NULL REFERENCES ${mediaSchema.getTable()}(id) ON DELETE CASCADE,
      ${fields.type} media_type NOT NULL,
      ${fields.rgbR} integer NOT NULL,
      ${fields.rgbG} integer NOT NULL,
      ${fields.rgbB} integer NOT NULL,
      ${fields.rgbCube} cube NOT NULL,
      ${fields.labL} decimal NOT NULL,
      ${fields.labA} decimal NOT NULL,
      ${fields.labB} decimal NOT NULL,
      ${fields.labCube} cube NOT NULL,
      ${fields.hslH} decimal NOT NULL,
      ${fields.hslS} decimal NOT NULL,
      ${fields.hslL} decimal NOT NULL,
      ${fields.hslCube} cube NOT NULL,
      ${fields.score} decimal NOT NULL,
      ${fields.pixelFraction} decimal NOT NULL,
      CHECK (${fields.rgbR} >= 0 AND ${fields.rgbR} <= 255),
      CHECK (${fields.rgbG} >= 0 AND ${fields.rgbG} <= 255),
      CHECK (${fields.rgbB} >= 0 AND ${fields.rgbB} <= 255),
      CHECK (${fields.labL} >= 0 AND ${fields.labL} <= 100),
      CHECK (${fields.labA} >= -160 AND ${fields.labA} <= 160),
      CHECK (${fields.labB} >= -160 AND ${fields.labB} <= 160),
      CHECK (${fields.hslH} >= 0 AND ${fields.hslH} <= 360),
      CHECK (${fields.hslS} >= 0 AND ${fields.hslS} <= 1),
      CHECK (${fields.hslL} >= 0 AND ${fields.hslL} <= 1),
      CHECK (${fields.score} >= 0 AND ${fields.score} <= 1),
      CHECK (${fields.pixelFraction} >= 0 AND ${fields.pixelFraction} <= 1),
      CHECK (cube_dim(${fields.rgbCube}) = 3 AND cube_dim(${fields.labCube}) = 3 AND cube_dim(${fields.hslCube}) = 3));

      CREATE INDEX IF NOT EXISTS lab_cube_index ON ${mediaColorsSchema.getTable()} using GIST (${fields.labCube});
  `);
};

exports.down = async (knex: Knex) => {
  return knex.schema.dropTable(mediaColorsSchema.getTable());
};
