## Listing KNEX migrations
yarn build    # builds knexfile 
node_modules/knex/bin/cli.js --knexfile ./dist/config/knexfile.js migrate:list

# Local development
- Make sure you are running `yarn dev` so new changes are compiled and picked up by the server