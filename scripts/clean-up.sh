#!/bin/bash

if [[ "$DEV" = "IOS" ]]; then
  echo "removing keys... cleaning up"
  scripts/ios/remove-key.sh
fi
