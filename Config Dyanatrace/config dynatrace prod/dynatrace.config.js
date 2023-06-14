module.exports = {
  react: {
    debug: true,

    lifecycle: {
      /**
             * Decide if you want to see Update Cycles as well
             */
      includeUpdate: false,

      /**
             * Filter for Instrumenting Lifecycle of Components / True = Will be instrumented
             */
      instrument: (filename) => false
    },

    input: {
      /**
             * Allows you to filter the instrumentation for touch events, refresh events and picker events in certain files
             * True = Will be instrumented
             */
      instrument: (filename) => true
    }
  },
  android: {
    // Those configs are copied 1:1
    config: `
        dynatrace {
            configurations {
                defaultConfig {
                    autoStart {
                        applicationId '44c3d9f5-c0b6-4ef2-9b86-63b22e14a885'
                        beaconUrl 'https://www.banksinarmas.com:9999/mbeacon/5342aeb5-7b4d-47db-a91e-646b8963a456'
                    }
                    userOptIn true
                }
            }
        }
        `
  },
  ios: {
    // Those configs are copied 1:1
    config: `
        <key>DTXApplicationID</key>
        <string>44c3d9f5-c0b6-4ef2-9b86-63b22e14a885</string>
        <key>DTXBeaconURL</key>
        <string>https://www.banksinarmas.com:9999/mbeacon/5342aeb5-7b4d-47db-a91e-646b8963a456</string>
        <key>DTXLogLevel</key>
        <string>ALL</string>
        <key>DTXUserOptIn</key>
        <true/>
        `
  }
};
