import React, {Component} from 'react';
import {result, noop} from 'lodash';
import {Text, View} from 'react-native';
import styles from './DigitalEForm.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import WebView from 'react-native-webview';

class DigitalEFormAgreement extends Component {
  static propTypes = {
    page: PropTypes.object,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object
  }

  state = {
    checked: false,
    showed: false
  }

  checking = () => {
    this.setState({
      checked: !this.state.checked,
    });
  }

  endReached = () => {
    this.setState({
      showed: true
    });
  }

  message = (data) => {
    this.endReached();
    const checkBox = result(data, 'nativeEvent.data', false);
    if (checkBox) {
      this.setState({checked: !this.state.checked});
    }
  }

  scollingToEnd = () => {
    this.webscroll.scrollToEnd();
  }

  toogleCheckbox = (checked) => {
    this.setState({checked, disable: checked});
  }

  render () {
    const {handleSubmit = noop, initialValues, navigation} = this.props;
    const url = result(initialValues, 'url', '');
    const productName = result(navigation, 'state.params.productData.productNameEN', '').includes('Digi');
    const productCode = result(navigation, 'state.params.productData.productCode', '');
    const dtOpening = productCode === 'SADG' ? 'Open Simas Digi Saving - Agree T&C Simas Digi Saving' : productName && productCode === 'UCCXV' ? 'Open Credit Card and Simas Digi Saving - Agree T&C Simas Digi Saving' : '';

    let GET_VALUE_CHECKBOX = `document.getElementById('checkbox').addEventListener('click', function(){
      window.ReactNativeWebView.postMessage("true")
    })
    true`;

    return (
      <View style={styles.agreementContainer}>
        <WebView source={{uri: url}}
          javaScriptEnabled={true}
          injectedJavaScript={GET_VALUE_CHECKBOX}
          onMessage={this.message}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.buttonTNCContainer}>
          <SinarmasButton dtActionName={dtOpening} onPress={handleSubmit} disabled={!this.state.checked}>
            <Text style={styles.nextButton}>{language.SMARTFREN__AGREE_BUTTON}</Text>
          </SinarmasButton>
        </View> 
      </View>
    );
  }
}


const agreementDispatch = () => ({
});

const ConnectedEFormUpload = connect(null, agreementDispatch)(DigitalEFormAgreement);

export default ConnectedEFormUpload;