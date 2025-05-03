import Knex from "knex";
import { mediaSchema } from "../schema";

exports.up = async (knex: Knex) => {
  await knex.raw(`
    ALTER TYPE media_type ADD VALUE 'gigapixel_photo';
  `);
};

exports.down = async (knex: Knex) => {};
