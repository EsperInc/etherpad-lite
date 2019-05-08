#!/bin/sh

#Move to the folder where ep-lite is installed
cd `dirname $0`

#Was this script started in the bin folder? if yes move out
if [ -d "../bin" ]; then
  cd "../"
fi

#Prepare the environment
bin/installDeps.sh $* || exit 1

#Move to the node folder and start
echo "Started Etherpad..."

SCRIPTPATH=`pwd -P`

forever start "$SCRIPTPATH/node_modules/ep_etherpad-lite/node/server.js" $*


