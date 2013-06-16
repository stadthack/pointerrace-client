#!/bin/bash

echo "Path is: $PATH"

npm install
npm install bower
npm install grunt-cli
node_modules/bower/bin/bower install
node_modules/grunt-cli/bin/grunt build
