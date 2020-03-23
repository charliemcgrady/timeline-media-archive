import Knex from 'knex';
import { storiesSchema } from "../schema";

exports.up = async (knex: Knex) => {
  const fields = storiesSchema.getFields();
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS ${storiesSchema.getTable()} (
      ${fields.id} text PRIMARY KEY,
      ${fields.ownerId} text REFERENCES users(id) ON DELETE CASCADE NOT NULL,
      ${fields.dateCreated} timestamptz NOT NULL,
      ${fields.lastModified} timestamptz NOT NULL,
      ${fields.title} text NOT NULL,
      ${fields.widgets} jsonb[] NOT NULL
    );
  `);
};

exports.down = async (knex: Knex) => {
  return knex.schema.dropTable(storiesSchema.getTable());
};
