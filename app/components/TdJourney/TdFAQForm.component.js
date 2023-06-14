import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './TdFAQ.component.style';
import WebView from 'react-native-webview';

class TdFAQForm extends React.Component {
  static propTypes = {
    confirmsTd: PropTypes.func,
    url: PropTypes.string,
    navigation: PropTypes.object,
    dynatrace: PropTypes.string,
  };

  render () {
    const {confirmsTd, url, dynatrace} = this.props;
    return (
      <View style={styles.container}>
        <WebView source={{uri: url}} />
        <View style={styles.buttonContainer}>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <SinarmasButton onPress={() => confirmsTd(dynatrace)} dtActionName={dynatrace + ' - Agree T&C'}>
            <Text style={styles.nextButton}>
              {language.TIME_DEPOSIT__AGREEMENT__BTN}
            </Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default TdFAQForm;
