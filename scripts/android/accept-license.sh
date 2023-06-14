#!/bin/sh

echo "Accepting android-28 license"

yes | sdkmanager "platforms;android-28"

echo "Accepting build-tools 28.0.3 license"

yes | sdkmanager "build-tools;28.0.3"