#!/bin/sh

# If you make changes to this file, rebuild the image (instructions in README)

# Perform all actions as $POSTGRES_USER
export PGUSER="$POSTGRES_USER"

# populate db with test data
psql charliemcgrady < /usr/local/data/test

# Uncomment to create the db from scratch instead of seed file
# psql -c "DROP DATABASE IF EXISTS charliemcgrady;"
# psql -c "CREATE DATABASE charliemcgrady;"
