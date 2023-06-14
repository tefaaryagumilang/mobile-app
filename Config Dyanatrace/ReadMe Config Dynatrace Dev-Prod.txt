step'' android dynatrace config
1. copy isi di dalam dynatrace.config.js dev/prod
2. paste ke file dynatrace.config.js yang berada setara dengan package.json file,page,component folder
3. save file
4. jalan kan command react-native instrument-dyantrace di console command propt/gitbash
5. jalan kan / build / run -> react-native run-android or build APK



step'' ios dynatrace config
1. copy isi di dalam dynatrace.config.js dev/prod, sebagai contoh yang hanya dicopy di bagian ini saja
        
	<key>DTXApplicationID</key>
        <string>44c3d9f5-c0b6-4ef2-9b86-63b22e14a885</string>
        <key>DTXBeaconURL</key>
        <string>https://www.banksinarmas.com:9999/mbeacon/5342aeb5-7b4d-47db-a91e-646b8963a456</string>
        <key>DTXLogLevel</key>
        <string>ALL</string>
        <key>DTXUserOptIn</key>
        <true/>

2. paste ke file info.plist yang berada di folder ios -> ubyapp -> info.plist. overwrite config exist (estimated, line 42-49)
3. save file
4. jalan kan / build / run -> react-native run-ios or build IPA