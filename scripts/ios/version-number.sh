#!/bin/sh

MARKETING_VERSION="1.0"
VERSION=${MARKETING_VERSION}"."${BUILD_NUMBER}

if [[ "$TRAVIS_EVENT_TYPE" = "cron" ]]; then
  if [[ "$DEV" = "IOS" ]]; then
    echo "Beta build - set version"
    VERSION="5.0.1"
  fi

  if [[ "$DEV" = "ANDROID" ]]; then
    echo "UAT build - set version"
    VERSION=${VERSION}".UAT"
  fi
fi

cd ios && xcrun agvtool new-version -all ${VERSION}
echo "set version number to ${VERSION}"
