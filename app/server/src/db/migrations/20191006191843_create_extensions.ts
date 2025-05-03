import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS postgis;`);
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS cube;`);
};

exports.down = async (knex: Knex) => {
  await knex.raw(`DROP EXTENSION IF EXISTS postgis;`);
  await knex.raw(`DROP EXTENSION IF EXISTS cube;`);
};
