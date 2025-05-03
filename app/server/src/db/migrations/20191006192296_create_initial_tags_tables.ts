import Knex from "knex";
import {
  tagEdgesSchema,
  tagsSchema,
  TagEdgesFields,
  TagsFields,
  mediaSchema
} from "../schema";

exports.up = async (knex: Knex) => {
  const tagFields = tagsSchema.getFields() as TagsFields;
  const edgeFields = tagEdgesSchema.getFields() as TagEdgesFields;

  // prettier-ignore
  await knex.raw(`
    BEGIN;
      CREATE TABLE IF NOT EXISTS ${tagsSchema.getTable()} (
        ${tagFields.id} text PRIMARY KEY,
        ${tagFields.ownerId} text REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        ${tagFields.label} text NOT NULL
      );

      CREATE TABLE IF NOT EXISTS tag_edges (
        ${edgeFields.id} text PRIMARY KEY,
        ${edgeFields.tagId} text REFERENCES tags(id) ON DELETE CASCADE NOT NULL,
        ${edgeFields.mediaId} text REFERENCES ${mediaSchema.getTable()}(id) ON DELETE CASCADE NOT NULL,
        ${edgeFields.rank} integer NOT NULL,
        CONSTRAINT unique_rank_per_tag UNIQUE(${edgeFields.tagId}, ${edgeFields.rank}) DEFERRABLE INITIALLY DEFERRED,
        CONSTRAINT unique_media_per_tag UNIQUE(${edgeFields.tagId}, ${edgeFields.mediaId})
      );
    COMMIT;
  `);
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable(tagsSchema.getTable());
  await knex.schema.dropTable(tagEdgesSchema.getTable());
};
