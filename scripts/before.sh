#! /bin/bash

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
  echo "This is a pull request - no native build will be done"
  exit 0
fi

if [[ "$DEV" = "IOS" ]]; then
  scripts/ios/version-number.sh
  scripts/ios/add-key.sh
fi

if [[ "$DEV" = "ANDROID" ]]; then
  scripts/android/add-keystore.sh
  chmod +x scripts/android/accept-license.sh
fi
