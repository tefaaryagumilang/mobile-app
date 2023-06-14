import React from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import {BackHandler, View, KeyboardAvoidingView, Platform} from 'react-native';
import {result, noop} from 'lodash';
import DeviceInfo from 'react-native-device-info';

class UltraVoucherWebView extends React.Component {

  constructor (props) {
    super(props);
    this.webView = null;
  }

  static propTypes = {
    uri: PropTypes.string,
    onMessage: PropTypes.func,
    onLoadStart: PropTypes.func,
    onLoadEnd: PropTypes.func,
    canGoBack: PropTypes.bool,
    navigation: PropTypes.object,
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack = () => {
    const {canGoBack, navigation} = this.props;
    const isFocused = result(navigation, 'isFocused', false);
    if (canGoBack && isFocused) {
      this.webView.goBack();
      return true;
    } else {
      return false;
    }
  }

  handleMessage = (event) => {
    const {onMessage} = this.props;
    onMessage(event);
  }

  getRef = (webView) => {
    this.webView = webView;
  }

  onNavigationStateChange = (navState) => {
    const url = result(navState, 'url', '');
    if (url.includes('orderHistoryDetail')) {
      this.setState({seeVoucherButton: true});
      const script = `document.getElementById('see-voucher-button').addEventListener('click', function(){
        window.ReactNativeWebView.postMessage("navigateToEvoucher");
      });
      true`;
      this.webView.injectJavaScript(script);
    } else {
      this.setState({seeVoucherButton: false});
    }
  }

  onLoadProgress = ({nativeEvent}) => {
    const url = result(nativeEvent, 'url', '');
    const progress = result(nativeEvent, 'progress', 0);
    const validProgress = DeviceInfo.isEmulator() ? progress === 1 : progress !== 1;
    if (url.includes('orderHistoryDetail') && validProgress) {
      const script = `document.getElementById('see-voucher-button').addEventListener('click', function(){
        window.ReactNativeWebView.postMessage("navigateToEvoucher");
      });
      true`;
      this.webView.injectJavaScript(script);
    } else {
      this.setState({seeVoucherButton: false});
    }
  }
  render () {
    const {uri, onLoadEnd, onLoadStart} = this.props;
    const disableZoom = `const meta = document.createElement('meta'); 
      meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); 
      meta.setAttribute('name', 'viewport'); 
      document.getElementsByTagName('head')[0].appendChild(meta);`;
    return (
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'height', android: 'padding'})}
        enabled
        contentContainerStyle={{flex: 1}}
        style={{flexGrow: 1}}>

        <View style={{flex: 1}}>
          <WebView
            source={{uri: uri}}
            onMessage={this.handleMessage}
            ref={this.getRef}
            onLoadStart={onLoadStart}
            onLoadEnd={onLoadEnd}
            javaScriptEnabled={true}
            injectedJavaScript={disableZoom}
            onLoadProgress={Platform.select({ios: noop, android: this.onLoadProgress})}
            onNavigationStateChange={Platform.select({ios: this.onNavigationStateChange, android: noop})}/>
        </View>

      </KeyboardAvoidingView>

    );
  }
}

export default UltraVoucherWebView;
