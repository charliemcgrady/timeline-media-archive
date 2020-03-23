#!/bin/sh

# Connect to Postgres in the db container using psql
CONTAINER_ID=$(docker ps -f "name=charliemcgrady_db_1" --format "{{.ID}}")
docker exec -it $CONTAINER_ID psql -U postgres charliemcgrady
