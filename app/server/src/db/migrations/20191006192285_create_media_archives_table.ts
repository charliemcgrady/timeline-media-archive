import Knex from "knex";
import { mediaArchivesSchema, mediaSchema } from "../schema";

exports.up = async (knex: Knex) => {
  const fields = mediaArchivesSchema.getFields();

  // prettier-ignore
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS ${mediaArchivesSchema.getTable()} (
      ${fields.id} text PRIMARY KEY REFERENCES ${mediaSchema.getTable()}(id) ON DELETE CASCADE NOT NULL,
      ${fields.exif} jsonb,
      ${fields.gcpVisionAnnotations} jsonb NOT NULL,
      ${fields.gcpStorageKey} text NOT NULL,
      ${fields.gcpStorageBucket} text NOT NULL,
      ${fields.s3ArchivedFileUrls} jsonb[] NOT NULL
    );
  `);
};

exports.down = async (knex: Knex) => {
  return knex.schema.dropTable(mediaArchivesSchema.getTable());
};
