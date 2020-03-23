#!/bin/sh

# Log into the shell of the db container
CONTAINER_ID=$(docker ps -f "name=charliemcgrady_db_1" --format "{{.ID}}")
docker exec -it $CONTAINER_ID bash