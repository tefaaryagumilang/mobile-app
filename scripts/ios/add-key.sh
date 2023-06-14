#!/bin/sh

echo "Decrypting and exporting keys."

echo "Decrypting provision profile"
openssl aes-256-cbc -k "$KEY_PASSWORD" -in scripts/ios/profile/ubyapp_Ad_Hoc.mobileprovision.enc -d -a -out scripts/ios/profile/ubyapp_Ad_Hoc.mobileprovision
echo "Decrypting distribution cert"
openssl aes-256-cbc -k "$KEY_PASSWORD" -in scripts/ios/certs/dist.cer.enc -d -a -out scripts/ios/certs/dist.cer
echo "Decrypting distribution key"
openssl aes-256-cbc -k "$KEY_PASSWORD" -in scripts/ios/certs/dist.p12.enc -d -a -out scripts/ios/certs/dist.p12

# Create a custom keychain and add it to the list
echo "creating ios-build key chain"
security create-keychain -p travis  ios-build.keychain
security list-keychains -d user -s ios-build.keychain
echo "Created ios-build key chain."

# Make the custom keychain default, so xcodebuild will use it for signing
security default-keychain -s ios-build.keychain

# Unlock the keychain
security unlock-keychain -p travis ios-build.keychain

# Set keychain timeout to 1 hour for long builds
# see http://www.egeek.me/2013/02/23/jenkins-and-xcode-user-interaction-is-not-allowed/
security set-keychain-settings -t 3600 -l ~/Library/Keychains/ios-build.keychain

# Add certificates to keychain and allow codesign to access them
echo "Import certs and keys."
echo "importing Apple cert"
security import ./scripts/ios/certs/AppleWWDRCA.cer -k ~/Library/Keychains/ios-build.keychain -T /usr/bin/codesign
echo "importing dist cert"
security import ./scripts/ios/certs/dist.cer -k ~/Library/Keychains/ios-build.keychain -T /usr/bin/codesign
echo "importing dist key"
security import ./scripts/ios/certs/dist.p12 -k ~/Library/Keychains/ios-build.keychain -P $KEY_PASSWORD -T /usr/bin/codesign

# fix the travis stalling issue
security set-key-partition-list -S apple-tool:,apple: -s -k travis  ios-build.keychain

# Put the provisioning profile in place
echo "putting  provisions in place"
mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
cp "./scripts/ios/profile/$PROFILE_NAME.mobileprovision" ~/Library/MobileDevice/Provisioning\ Profiles/
echo "provisions in place"
