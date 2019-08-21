#!/bin/bash
set -eu

m4 \
  "-DETHERPAD_DB_USER=${ETHERPAD_DB_USER}" \
  "-DETHERPAD_DB_HOST=${ETHERPAD_DB_HOST}" \
  "-DETHERPAD_DB_PASSWORD=${ETHERPAD_DB_PASSWORD}" \
  "-DETHERPAD_PASSWORD=${ETHERPAD_PASSWORD}" \
  "-DETHERPAD_PORT=${ETHERPAD_PORT}" \
  settings.json.m4 > settings.json

echo "${ETHERPAD_API_KEY}" > APIKEY.txt

bin/wait-for-it.sh "${ETHERPAD_DB_HOST}:3306"
exec "$@"
