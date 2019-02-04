#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set -e

export PATH=${PWD}/../bin:${PWD}:$PATH
export FABRIC_CFG_PATH=${PWD}
export VERBOSE=false

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

IMAGETAG="1.3.0"
# use node as the default language for chaincode
LANGUAGE=node
CHANNEL_NAME="goodcharchannel"
COMPOSE_FILE=docker-compose-cli.yaml
COMPOSE_FILE_COUCH=docker-compose-couch.yaml

while getopts "h?c:t:d:f:s:l:i:v" opt; do
  case "$opt" in
  h | \?)
    printHelp
    exit 0
    ;;
  c)
    CHANNEL_NAME=$OPTARG
    ;;
  t)
    CLI_TIMEOUT=$OPTARG
    ;;
  d)
    CLI_DELAY=$OPTARG
    ;;
  f)
    COMPOSE_FILE=$OPTARG
    ;;
  s)
    IF_COUCHDB=$OPTARG
    ;;
  l)
    LANGUAGE=$OPTARG
    ;;
  i)
    IMAGETAG=$(go env GOARCH)"-"$OPTARG
    ;;
  v)
    VERBOSE=true
    ;;
  esac
done


if [ "${IF_COUCHDB}" == "couchdb" ]; then
  IMAGE_TAG=$IMAGETAG docker-compose -f $COMPOSE_FILE -f $COMPOSE_FILE_COUCH up -d 2>&1
else
  IMAGE_TAG=$IMAGETAG docker-compose -f $COMPOSE_FILE up -d 2>&1
fi

if [ $? -ne 0 ]; then
  echo "ERROR !!!! Unable to start network"
  exit 1
else
  echo
  echo "#################################################################"
  echo "=================== GOODCHAR-NETWORK started ==================="
  echo "#################################################################"
  echo
fi

