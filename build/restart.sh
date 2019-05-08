#!/bin/bash

# Gets the bin directory, for explanation of command, see:
# https://www.ostricher.com/2014/10/the-right-way-to-get-the-directory-of-a-bash-script/
BIN_DIR="$(dirname "${BASH_SOURCE[0]}")"/../bin
# The following command was giving an incorrect answer if ran from the script's directory.
# The problem is that the first dirname would give "." and dirname of that is still ".".
# BIN_DIR="$(cd "$(dirname "$(dirname "${BASH_SOURCE[0]}")")" && pwd)"/bin

$BIN_DIR/runForever.sh
