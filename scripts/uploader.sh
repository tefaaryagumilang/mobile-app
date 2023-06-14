#!/bin/bash

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
	  echo "This is a pull request. No deployment will be done."
	    exit 0
fi

if [[ "$DEV" = "IOS" ]]; then
  echo "Uploading ipa to TestFairy..."
  $TRAVIS_BUILD_DIR/scripts/tf_uploader.sh "$TRAVIS_BUILD_DIR/ios/build/Products/IPA/ubyapp.ipa"
fi

if [[ "$DEV" = "ANDROID" ]]; then
  echo "Uploading apk to TestFairy..."
  $TRAVIS_BUILD_DIR/scripts/tf_uploader.sh "$TRAVIS_BUILD_DIR/android/app/build/outputs/apk/release/app-release.apk"
fi
