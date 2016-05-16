#!/bin/bash
DOCKER_BIN="/usr/bin/docker"
INTERACT="-ti"
NAME="xqrank"
#INTERACT="-d"
DATA_VOLUME="/home"
DATA_MOUNT_POINT="/home"
set -e
if [ $# -lt 2 ]; then
    echo "Usage: $0 image command"
    exit -1
else
    IMAGE=$1
    shift 1
    CMD=$@

fi

exec $DOCKER_BIN run \
        "$INTERACT" \
        --name=$NAME\
        -p 127.0.0.1:1234:1234\
        -v $DATA_VOLUME:$DATA_MOUNT_POINT \
        -v /etc/localtime:/etc/localtime:ro\
        "$IMAGE" \
        $CMD
