import Knex from "knex";
import { tagEdgesSchema } from "../schema";

exports.up = async (knex: Knex) => {
  await knex.raw(`
    ALTER TABLE ${tagEdgesSchema.getTable()}
    ADD COLUMN IF NOT EXISTS ${tagEdgesSchema.getFields().mediaId} text;

    ALTER TABLE ${tagEdgesSchema.getTable()}
    DROP COLUMN IF EXISTS mediaId;

    ALTER TABLE ${tagEdgesSchema.getTable()}
    DROP COLUMN IF EXISTS rank;

    ALTER TABLE ${tagEdgesSchema.getTable()}
    DROP CONSTRAINT IF EXISTS unique_rank_per_tag;
  `);
};

exports.down = async (knex: Knex) => {
  return knex.raw(`
    ALTER TABLE ${tagEdgesSchema.getTable()}
    ADD COLUMN media_id text;

    ALTER TABLE ${tagEdgesSchema.getTable()}
    DROP COLUMN ${tagEdgesSchema.getFields().mediaId};
  `);
};
