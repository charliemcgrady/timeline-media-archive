import Knex from "knex";
import { mediaSchema } from "../schema";

exports.up = async (knex: Knex) => {
  await knex.raw(`
    ALTER TABLE ${mediaSchema.getTable()}
    ADD COLUMN ${mediaSchema.getFields().caption} text;
  `);
};

exports.down = async (knex: Knex) => {
  return knex.raw(`
    ALTER TABLE ${mediaSchema.getTable()}
    DROP COLUMN ${mediaSchema.getFields().caption};
  `);
};
