#!/bin/bash
set -e

NAME=$(node -e "console.log(require('./package.json').name)")
VERSION=$(node -e "console.log(require('./package.json').version)")

npm install
npm run build
docker build "dist/$NAME" -t "triercloud/$NAME-frontend:$VERSION"
