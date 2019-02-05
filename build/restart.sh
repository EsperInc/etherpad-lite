#!/bin/bash

# Gets the script's directory, for explanation of command, see:
# https://www.ostricher.com/2014/10/the-right-way-to-get-the-directory-of-a-bash-script/
BIN_DIR="$(cd "$(dirname "$(dirname "${BASH_SOURCE[0]}")")" && pwd)"/bin

$BIN_DIR/screenRun.sh
