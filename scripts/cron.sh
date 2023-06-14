#! /bin/bash


if [[ "$TRAVIS_EVENT_TYPE" = "cron" ]]; then
  if [[ "$DEV" = "IOS" ]]; then
    echo "Setting ENV to PRODUCTION for iOS Cron job"
    echo "Copying production.env.js"
    cp app/config/env/production.env.js app/config/env.config.js
  fi 

  if [[ "$DEV" = "ANDROID" ]]; then
    echo "Setting ENV to UAT for Cron job"
    echo "Copying uat.env.js"
    cp app/config/env/uat.env.js app/config/env.config.js
  fi
fi
