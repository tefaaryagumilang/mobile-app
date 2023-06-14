[![Build Status](https://travis-ci.com/banksinarmas/mobile-app.svg?token=UA1pdAVNS63aWrDvQu4h&branch=master)](https://travis-ci.com/banksinarmas/mobile-app)

# UBY App

## Instructions

#### Running the code

1. `git clone https://github.com/banksinarmas/uby-app.git`
2. `yarn` (Don't do npm install as the updated depencies are locked in yarn.lock)
3. Install [react-native-debugger](https://github.com/jhen0409/react-native-debugger)
4. Do `npm run android`/`npm run ios` if you have a MAC or `react-native run-ios`/`react-native run-android` if you are on a windows machine.

#### Available scripts

1. Run unit test - `npm run test`
2. Run unit test in watch mode - `npm run test:watch`
3. Run unit test and update snapshots - `npm run test:update`
4. Run coverage report generator - `npm run coverage`

### Use SVG Icons in the Mobile Application
Please find the detailed documentation here on Confluence - http://10.32.1.114:8090/display/SIM/Use+SVG+Icons+in+Mobile+App

### ANDROID SDK configuration

- build-tools-23.0.1
- android-23
- extra-android-m2repository
- extra-google-google_play_services
- extra-google-m2repository
- addon-google_apis-google-23

### Coding Practices

 - We are using `class properties + arrow function` instead of class methods and using `super(props)` syntax to define class methods. Blog [URL](http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/)


## Code Snippets

- Sample Page Snippet:

```
import React, {Component, PropTypes} from 'react';

import SomeComponent from '../../components/SomeComponent/SomeComponent.component';

import {connect} from 'react-redux';

class SomeComponentPage extends Component {
  static propTypes = {
  }
  componentWillMount () {
  }
  render () {
    return <SomeComponent/>;
  }
}

const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => ({

});

const ConnectedSomeComponentPage = connect(mapStateToProps, mapDispatchToProps)(SomeComponentPage);

export default ConnectedSomeComponentPage;

```

- Sample Component Snippet:

```
import React, {PropTypes} from 'react';
import {View, Text} from 'react-native';

class SomeComponent extends React.Component { //We can use functional /stateless components here as well
  static propTypes = {

  }
  render () {
    return (
      <View>
        <Text>Some Text</Text>
      </View>);
  }
}

export default SomeComponent;

```

- Sample Snapshot Test:

```
//File name: ./__test__/SomeDumbComponent.component.test.js

import React from 'react';
import renderer from 'react-test-renderer';

import SomeDumbComponent from '../SomeDumbComponent.component';

describe('SomeDumbComponent component', () => {
  it('SomeDumbComponent: renders correctly', () => {
    const tree = renderer.create(<SomeDumbComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

```

- Sample Redux Form Snapshot Test:

```
import React from 'react';
import renderer from 'react-test-renderer';
import SomeFormComponent from '../SomeFormComponent.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(SomeFormComponent);

describe('SomeFormComponent: SomeFormComponent page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

```
#### Pages conventions:
- Component defined in .page.js should be named as `<SomeComponent>Page`.
- The page will import `SomeComponent` from components folder and just render it.
- The page should never import react-native components.
- Only the page should have access to dispatch and the store state, if required.
- All the routes should have a page file, even if the route contains static information. `.route.js` file should only import files from pages folder.



## Production Deployment steps

```==========================
Prod ANDROID
==========================
git fetch
git branch
git pull origin r/5.1.1
yarn install
vi scripts/prod/android/env_setup
    /Users/arianto/Documents/mac-old/Documents/SIMOBIPLUS/ionic/simobiPlus/jks.keystore
    /Users/arianto/Library/Android/sdk/build-tools/23.0.1/aapt
export DEV=ANDROID
export KEY_PASSWORD=“*******”
export KEY_STORE_PASSWORD=“*******”
export ANDROID_HOME=“/Users/arianto/Library/Android/sdk”
cd scripts/prod/android
./make configure
./make apk
./make verify

===========================
Prod IOS(TODO: Need to automate removal of testfairy using makefile, similar to what we are currently doing in case of android. Maybe later)
===========================
git fetch
git branch
git checkout r/5.2.0 (The branch which is to be deployed)
git pull origin r/5.2.0
yarn install
Delete ios/Testfairy.h (Follow this commit for more details: https://github.com/banksinarmas/mobile-app/pull/1364/commits/c3899abce002189a19625ba95f44dac708a255f4)
Delete ios/libTestFairy.a (Follow this commit for more details: https://github.com/banksinarmas/mobile-app/pull/1364/commits/c3899abce002189a19625ba95f44dac708a255f4)
Remove TestFairy usage from AppDelegate.m (Follow this commit for more details: https://github.com/banksinarmas/mobile-app/pull/1364/commits/c3899abce002189a19625ba95f44dac708a255f4)
Remove TestFairy reference from ios/ubyapp.xcodeproj/project.pbxproj ((Follow this commit for more details: https://github.com/banksinarmas/mobile-app/pull/1364/commits/805fad4746371da9bd1185ab8869dac02758cda5)
open xcode in mobile-app/ios/xxx.xcodeproj
Change xcode scheme buildConfiguration=‘Release’, customArchiveName=‘SimobiPlus-5.2.0’
Change Xcode configuration
    - Bundle Identifier : com.simas.mobile.SimobiPlus
    - Version : 5.2.0
    - Build : 5.2.0
    - Check Automatically manage signing with BankSinarmas.Tbk signing key’
    - Deployment Target = 8
    - Devices = Universal
    - Portrait, Upside Down, Requires Full Screen = All Check
then upload to itunes.
```



## Encryption and decryption:

Most of the sensitive files are encrypted and then stored in the repo.
Some examples include android keystore, provisioning profile, signing certificated, private keys etc.

They are present in the folder `/scripts/android` or `/scripts/ios` with an extension `.enc`

#### Decryption

To **decrypt** the existing encrypted files run the command:

```
openssl aes-256-cbc -k "<PASSWORD>" -in <FILE>.enc -d -a -out <FILE>
```


For example:

```
openssl aes-256-cbc -k "<PASSWORD>" -in ubyapp_Ad_Hoc.mobileprovision.enc -d -a -out ubyapp_Ad_Hoc.mobileprovision
```

**NOTE:** These decryption steps are present in the `/scripts/` shell scripts.


#### Encryption

To encrypt a file use the following command:
```
openssl aes-256-cbc -in <FILE> -out <FILE>.enc -a
```

Then enter the password to encrypt when prompted.


*NOTE:* In Travis, when a build is run , all the files are first decrypted and then the build step proceeds further.
