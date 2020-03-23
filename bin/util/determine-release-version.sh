#!/bin/sh

determine_release_version () {
  VERSION=$(terraform output $1)
  MAJOR=0
  MINOR=0
  BUILD=0

  REGEX="v([0-9]+).([0-9]+).([0-9]+)"
  if [[ $VERSION =~ $REGEX ]]; then
    MAJOR="${BASH_REMATCH[1]}"
    MINOR="${BASH_REMATCH[2]}"
    BUILD="${BASH_REMATCH[3]}"
  fi

  if [[ "$2" == "minor" ]]; then
    MINOR=$(echo $MINOR + 1 | bc)
  elif [[ "$2" == "build" ]]; then
    BUILD=$(echo $BUILD + 1 | bc)
  elif [[ "$2" == "major" ]]; then
    MAJOR=$(echo $MAJOR+1 | bc)
  else
    echo -1
    exit -1
  fi

  echo "${MAJOR}.${MINOR}.${BUILD}"
}
