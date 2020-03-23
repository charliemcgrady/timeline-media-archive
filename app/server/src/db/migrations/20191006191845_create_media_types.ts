import Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.raw(`
    CREATE TYPE media_type AS ENUM ('photo', 'photosphere', 'video', 'audio');
  `);
};

exports.down = async (knex: Knex) => {
  await knex.raw(`
    DROP TYPE media_type;
  `);
};
