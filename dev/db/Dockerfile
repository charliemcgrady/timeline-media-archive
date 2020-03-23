FROM postgres:11

ADD bin/initdb.sh /docker-entrypoint-initdb.d/initdb.sh
ADD data/test /usr/local/data/test

ENV POSTGISV 2.5

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  postgresql-$PG_MAJOR-postgis-$POSTGISV \
  postgresql-$PG_MAJOR-postgis-$POSTGISV-scripts