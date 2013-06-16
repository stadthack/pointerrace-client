#!/bin/bash
echo "This file need environment Variables"

echo "Copy Files to $TARGET_HOST:$TARGET_DIR"
rsync --delete-delay -vrz --progress * .bowerrc .jshintrc $TARGET_HOST:$TARGET_DIR || exit 1
ssh $TARGET_HOST "cd $TARGET_DIR && bash install.sh"
