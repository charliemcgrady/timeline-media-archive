## Logging in to Amazon RDS instance / seeding testing data from production db

Our db instance is not publically accessible. Therefore, we need to proxy to it through the server container running in the VPC. The steps are:

1. ssh into the host - `ssh -vv -i ~/Documents/Keys/charliemcgrady-ssh-key-pair.pem ec2-user@34.216.75.223`. If this fails, make sure the IP address is correct, the ssh key still exists, and the inbound ssh rules have your IP address whitelisted.
2. install the latest docker image - `docker pull postgres:11.5; docker run postgres:11.5` (11.5 is the version of postgres you are currently running in RDS)
3. ssh into the host in another window
4. log in to the docker image - `docker exec -it 37eea639902b sh`
5. use psql to access the RDS instance and verify the connection - `psql -p 5432 -h charliemcgrady-production-db.ckrjnbhcj2rc.us-west-2.rds.amazonaws.com -U postgres charliemcgrady`
6. use pd_dump to create a backup of the prod db - `pg_dump -p 5432 -h charliemcgrady-production-db.ckrjnbhcj2rc.us-west-2.rds.amazonaws.com -U postgres charliemcgrady > backup;`
7. copy the backup to the ec2 host from the container - `docker cp 37eea639902b:backup backup`
8. copy the backup from the ec2 to your laptop - `scp -i ~/Documents/Keys/charliemcgrady-ssh-key-pair.pem ec2-user@34.216.75.223:/home/ec2-user/backup ~/workspace/charliemcgrady/dev/db/data/test`
9. go to the workspace - `cd ~/workspace/charliemcgrady`
10. rebuild the db image - `docker build /Users/charliemcgrady/workspace/charliemcgrady/dev/db/ -t charliemcgrady-db --no-cache` (pro-tip: To rebuild the node server, do `docker build /Users/charliemcgrady/workspace/charliemcgrady/app/ -f /Users/charliemcgrady/workspace/charliemcgrady/app/Dockerfile-node-server -t charliemcgrady-node-server --no-cache`)
11. re-init the test environment - `./dev/bin/init-node-server.sh`

## Clearing out db data

1. Use steps above to connect to psql in the docker container.
2. `delete from photos` - The cascading relationships will delete all the data you need
