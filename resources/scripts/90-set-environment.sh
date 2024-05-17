#!/bin/sh

set -e

# Replaced environment variables:
# - clientId

PROJECT_FOLDER=/usr/share/nginx/html/{PROJECT_NAME}
envsubst < $PROJECT_FOLDER/assets/env.template.js > $PROJECT_FOLDER/assets/env.js
node $PROJECT_FOLDER/recalculate-ngsw-hash.js "$PROJECT_FOLDER" "assets/env.js" "{PROJECT_NAME}"
