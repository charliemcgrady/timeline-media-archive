#!/bin/sh

# Log into the shell of the node-server container
CONTAINER_ID=$(docker ps -f "name=charliemcgrady_node-server_1" --format "{{.ID}}")
docker exec -it $CONTAINER_ID sh