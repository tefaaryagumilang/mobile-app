import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './FundTransferMethod.style';
import noop from 'lodash/noop';
import {SinarmasButton, RadioButton} from '../FormComponents';
import {Field} from 'redux-form';
import * as Utils from '../../utils/transformer.util';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import result from 'lodash/result';


class FundTransferPayment extends Component {
  static propTypes = {
    payee: PropTypes.object,
    accountList: PropTypes.array,
    onNextPress: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    paymentMethods: PropTypes.array,
    amount: PropTypes.string,
    transferChargeConfig: PropTypes.array,
    timeConfig: PropTypes.object,
    dynatrace: PropTypes.string,
  }

  render () {
    const {invalid, submitting, onNextPress = noop, paymentMethods = [], amount, transferChargeConfig, timeConfig, payee, formValues, dynatrace} = this.props;
    const radioOptions = Utils.transformToTransferTypeRadioDataWithAmount(paymentMethods, amount, transferChargeConfig, payee);
    const transferTypeTracing = result(payee, 'transferType', '') === null || (result(payee, 'transferType', '') === 'external' && result(formValues, 'transferMode', '') !== 'bifast') ? 'Other Bank' : result(formValues, 'transferMode', '') === 'bifast' ? 'Send Money Method' : result(payee, 'transferType', '');
    const resultPayee = dynatrace && result(formValues, 'transferMode', '') === 'bifast' ? dynatrace + ' - Choose BI Fast Method - Next after Choose Transfer Method' : result(formValues, 'transferMode', '') === 'bifast' ? 'Next : ' + transferTypeTracing : 'Next Transfer ' + transferTypeTracing + ' 2';
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120}>
        <View>
          <View style={styles.paddingContent}>
            <Text style={styles.title}>{language.TRANSFER__METHOD}</Text>
          </View>
          <View style={styles.formContainer}>
            <Field name='transferMode' normalize={Utils.normalizeTransferType} format={Utils.formatTransferType}
              component={RadioButton}
              renderFull={true}
              options={radioOptions}
              timeConfig={timeConfig}
              transferChargeConfig={transferChargeConfig}
              dynatrace={dynatrace}
            />
          </View>
          <View style={styles.footerContainer}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <SimasIcon name='caution-circle' size={24}/>
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.info}>{language.TRANSFER__METHOD_FOOTER}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.paddingContent}>
          <SinarmasButton dtActionName={resultPayee} disabled={invalid || submitting} onPress={onNextPress} text={language.SERVICE__NEXT_BUTTON} />
        </View>

      </KeyboardAwareScrollView>

    );
  }
}

export default FundTransferPayment;
