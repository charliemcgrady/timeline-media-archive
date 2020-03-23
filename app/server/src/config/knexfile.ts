import path from 'path';
import knex from 'knex';

if (!process.env.PWD) {
  throw new Error("Unabled to determine current working directory");
}

const config: knex.Config = {
  client: 'postgres',
  connection: {
    host: process.env.DB_HOST,
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'charliemcgrady'
  },
  migrations: {
    disableTransactions: true,
    directory: path.resolve(process.env.PWD, 'dist', 'db', 'migrations'),
  },
  seeds: {
    directory: path.resolve(process.env.PWD, 'dist', 'db', 'seeds'),
  },
};

module.exports = config;
