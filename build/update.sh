#!/bin/bash

# Gets the script's directory, for explanation of command, see:
# https://www.ostricher.com/2014/10/the-right-way-to-get-the-directory-of-a-bash-script/
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

GIT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

git -C $GIT_DIR/etherpad-lite fetch
git -C $GIT_DIR/etherpad-lite checkout $1
git -C $GIT_DIR/etherpad-lite pull

wait

$SCRIPT_DIR/restart.sh
