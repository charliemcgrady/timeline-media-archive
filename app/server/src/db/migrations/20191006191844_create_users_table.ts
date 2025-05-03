import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS users (
      id text PRIMARY KEY,
      username text
    );
  `);
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('users');
};
