import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {Text, View} from 'react-native';
import {headingLight} from '../../styles/common.styles';
import {SinarmasInputBox, SinarmasInput} from '../FormComponents';
import {
  wrapMethodInFunction,
  formatFieldAccount,
  generateLanguageGenericBiller,
  formatMobileNumberEmoney,
  formatFieldNote} from '../../utils/transformer.util';
import styles from './BillerTypeSixIndex.style';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {result, noop, isEmpty} from 'lodash';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {selectContactPhone} from 'react-native-select-contact';
import {Toast} from '../../utils/RNHelpers.util';
import PaymentHistory from '../PaymentHistory/PaymentHistory.component';

class BillerTypeSixIndex extends Component {
  static propTypes = {
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleCardClick: PropTypes.func,
    billers: PropTypes.array,
    recentTransactions: PropTypes.array,
    biller: PropTypes.object,
    billerGopay: PropTypes.object,
    getEnquiry: PropTypes.func,
    showInquiry: PropTypes.bool,
    selectMobileNo: PropTypes.func,
    isUsingPhoneNumber: PropTypes.bool,
    billpayHistory: PropTypes.array,
    deleteBillpayHistory: PropTypes.func,
    reloadHistory: PropTypes.func,
    selectHistory: PropTypes.func,
    billerList: PropTypes.func,
  }

  getContact = () => {
    const {selectMobileNo} = this.props;
    selectContactPhone().then((selection) => {
      if (!selection) {
        return null;
      }
      const number = formatMobileNumberEmoney(result(selection, 'selectedPhone.number', ''));
      selectMobileNo(number);
    }).catch(() => {
      Toast.show(language.PERMISSION_ERROR__CONTACTS, Toast.LONG);
    });
  }

  goToIndex = (biller, subscriberNo) => () => {
    const {selectHistory, handleSubmit = noop} = this.props;
    selectHistory(subscriberNo);
    setTimeout(() => {
      handleSubmit();
    }, 0);
  }

  render () {
    const {invalid, handleSubmit = noop, submitting, biller, isUsingPhoneNumber,
      billpayHistory, deleteBillpayHistory, reloadHistory, billerList} = this.props;
    const subscriberNoText = language[generateLanguageGenericBiller(result(biller, 'billerPreferences.paymentSubscriberNoKey') || result(biller, 'billerPreferences.purchaseSubscriberNoKey', ''))];
    let billerName;
    if (result(biller, 'name', '') === 'Go-Pay Customer') {
      billerName = 'Gopay';
    } else {
      billerName = result(biller, 'name', '');
    }
    let billerNameHistory;
    let inputBillerName;
    if (result(biller, 'billerPreferences.category', '') === 'Pulsa Prepaid' || isEmpty(biller)) {
      billerNameHistory = 'Prepaid Telco - Choose Recipient from list';
      inputBillerName = 'Prepaid Telco - Input New ID';
    } else {
      billerNameHistory = 'Biller ' + billerName + ' - ' + 'Choose Recipient from list';
      inputBillerName = 'Biller ' + billerName + ' - ' + 'Input New ID';
    }
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <View style={styles.cardVerticalSpacingStyle}>
          <View style={styles.row}>
            <View>
              <SimasIcon name={'purchase'} size={30} style={[styles.purchase, styles.mr10]}/>
            </View>
            <View>
              <Text style={[headingLight]}>{language.GENERIC_BILLER__PAY}</Text>
              <Text style={[{fontFamily: 'Roboto'}]}>{result(biller, 'name', '')}</Text>
            </View>
          </View>
          <View style={styles.labelSpacing} />

          <View>
            <View style={styles.row2}>
              <Field
                name='subscriberNo'
                label={subscriberNoText}
                placeholder={'Phone Number'}
                format={formatFieldAccount} normalize={formatFieldAccount}
                component={SinarmasInputBox}
                keyboardType='numeric'
              />
              {isUsingPhoneNumber ?
                <Touchable onPress={this.getContact} style={styles.contactIcon}>
                  <View><SimasIcon name='contact' size={25}/></View>
                </Touchable> : null
              }
              <Touchable dtActionName={inputBillerName} onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting}>
                <SimasIcon name={'arrow-next-red'} size={30} style={invalid || submitting ? styles.arrowDisable : styles.arrow} />
              </Touchable>
            </View>
            <View style={styles.aliasStyle}>
              <Field
                name='description'
                label={language.HINTTEXT__ALIAS}
                placeholder={language.HINTTEXT__ALIAS}
                format={formatFieldNote}
                normalize={formatFieldNote}
                component={SinarmasInput}
                maxLength={16}
              />
            </View>
          </View>
          <PaymentHistory dtActionNameHistory={billerNameHistory} billpayHistory={billpayHistory} billerList={billerList}
            goToIndex={this.goToIndex} deleteBillpayHistory={deleteBillpayHistory}
            reloadHistory={reloadHistory}/>
        </View>
        <View style={styles.labelSpacing} />
      </KeyboardAwareScrollView>
    );
  }
}

export default BillerTypeSixIndex;
