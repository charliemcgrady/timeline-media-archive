import Knex from "knex";
import { mediaSchema } from "../schema";

exports.up = async (knex: Knex) => {
  const fields = mediaSchema.getFields();

  // prettier-ignore
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS ${mediaSchema.getTable()} (
      ${fields.id} text PRIMARY KEY,
      ${fields.ownerId} text REFERENCES users(id) ON DELETE CASCADE NOT NULL,
      ${fields.type} media_type NOT NULL,
      ${fields.dateTaken} timestamptz NOT NULL,
      ${fields.lastModified} timestamptz NOT NULL,
      ${fields.rating} integer NOT NULL,
      ${fields.width} integer NOT NULL,
      ${fields.height} integer NOT NULL,
      ${fields.dominantColorHex} text NOT NULL,
      ${fields.filepaths} jsonb NOT NULL,
      CONSTRAINT valid_width_height CHECK (${fields.width} > 0 AND ${fields.height} > 0),
      CONSTRAINT valid_rating CHECK (${fields.rating} > 0 AND ${fields.rating} < 6)
    );
  `);
};

exports.down = async (knex: Knex) => {
  return knex.schema.dropTable(mediaSchema.getTable());
};
