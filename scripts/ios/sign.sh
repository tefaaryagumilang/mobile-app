#!/bin/sh

#PROVISIONING_PROFILE="$HOME/Library/MobileDevice/Provisioning Profiles/$PROFILE_NAME.mobileprovision"
#PROVISIONING_PROFILE="$HOME/Library/MobileDevice/Provisioning Profiles/ubyapp_Ad_Hoc.mobileprovision"
#OUTPUTDIR="$PWD/build/Release-iphoneos"

#xcodebuild archive -project ./ios/ubyapp.xcodeproj -scheme ubyapp -configuration RELEASE -derivedDataPath ./ios/build -archivePath ./ios/build/Products/ubyapp.xcarchive

# running exportArchive
echo "Export archive to create IPA file"
xcodebuild -exportArchive -archivePath ./ios/build/Products/ubyapp.xcarchive -exportOptionsPlist ./scripts/ios/exportOptions-Release.plist -exportPath ./ios/build/Products/IPA
#xcodebuild -quiet -exportArchive -archivePath ./ios/build/Products/ubyapp.xcarchive -exportSigningIdentity "iPhone Developer: Balu Ramananda (6J3VWRWZ52)" -exportPath ./ios/build/Products/ubyapp
