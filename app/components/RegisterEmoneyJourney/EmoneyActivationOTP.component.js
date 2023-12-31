import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard} from 'react-native';
import {SinarmasButtonOnboarding, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import SmsOtpInput from '../SmsOtp/SmsOtpInput.component';
import {language} from '../../config/language';
import styles from '../CreateNewAccount/CreateAccountOTP.styles';
import {wrapMethodInFunction, getOTPFromMsg} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import BackgroundTimer from 'react-native-background-timer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import tracker from '../../utils/googleAnalytics.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import result from 'lodash/result';
import startsWith from 'lodash/startsWith';

const totalSeconds = 30;

class EMoneyActivationOTP extends Component {
  subscriber = null;
  state = {
    secondsRemaining: totalSeconds
  }

  tick = () => {
    const {userId, TXID} = this.props;
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      BackgroundTimer.clearInterval(this.interval);
      tracker.trackEvent('OTP_NOT_RECEIVED_ONBOARDING', 'TOOK_TIME: ' + String(totalSeconds - this.state.secondsRemaining), null, {label: `TXID: ${TXID}, ID: ${userId}`});
    }
  }

  componentDidMount = () => {
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  readSmsOtp = (message) => {
    const otp = getOTPFromMsg(message, 'sms token SimobiPlus');
    if (otp) {
      this.props.setOTP(otp);
      this.hideKeyboard();
    }
  }

  resendOTP = () => {
    const {navigation} = this.props;
    const transRefNum = result(navigation, 'state.params.transRefNum', '');
    const activateOtp = result(navigation, 'state.params.payload.activateOtp', '');
    const tokenEmail = result(navigation, 'state.params.payload.tokenEmail', '');
    const typeActivation = result(navigation, 'state.params.payload.typeActivation', '');
    const payload = {transRefNum, activateOtp, tokenEmail, typeActivation};
    

    this.setState({resending: true});
    return this.props.resendOTP(payload).then(() => {
      this.interval = BackgroundTimer.setInterval(this.tick, 1000);
      this.setState({
        secondsRemaining: totalSeconds,
        resending: false
      });
    }).catch(() => {
      this.setState({
        secondsRemaining: 0,
        resending: false,
      });
    });
  }

  hideKeyboard =  () => {
    const {userId, TXID} = this.props;
    Keyboard.dismiss();
    tracker.trackEvent('OTP_RECEIVED_ONBOARDING', 'TOOK_TIME: ' + String(totalSeconds - this.state.secondsRemaining), null, {label: `TXID: ${TXID}, ID: ${userId}`});
  }

  render () {
    const {navigation, currentLanguage, productName, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const mobileNum = result(navigation, 'state.params.mobileNumber');
    const checkMobileNum = startsWith(mobileNum, 62);
    const finalMobileNum = checkMobileNum ? mobileNum.substring(2, mobileNum.length) : mobileNum;
    const noCard = result(navigation, 'state.params.noCard', false);
    const dtNocard = 'Register SimobiPlus - Don’t Have ATM Card Number - ';

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerOTP} extraHeight={120}>
        <View style={styles.columnContainer}>
          <View>
            <View style={styles.rowOtpSubIcon}>
              <View>
                {currentLanguage === 'id' ?
                  <Text style={styles.otpHeaderTitle}>
                    {language.ONBOARDING__ENTER_OTP_PART_ONE}
                    <Text style={styles.otpPartSMS}>{language.ONBOARDING__ENTER_OTP_PART_TWO}</Text>
                  </Text> :
                  <Text style={styles.otpHeaderTitle}>
                    {language.ONBOARDING__ENTER_OTP_PART_ONE}
                    <Text style={styles.otpPartSMS}>{language.ONBOARDING__ENTER_OTP_PART_TWO}</Text>
                  </Text>
                }
              </View>
              <View>
                <SimasIcon name='OTP' style={styles.otpIcon} size={50}/>
              </View>
            </View>
            <View>
              <Text style={styles.loginWelcomeSubMessageOTP}>
                {language.ONBOARDING__OTP_SEND_TO} {finalMobileNum}
              </Text>
            </View>
            <View style={styles.rowOtpIcon} />
          </View>
          <View style={styles.container}>
            <View style={styles.inputOTPCOntainer}>
              <Field name={'OTP'} style={styles.inputOTP} component={SmsOtpInput} secureTextEntry={false} submitHandler={this.hideKeyboard}/>
            </View>
            {this.state.secondsRemaining ? <View style={styles.containerResend}><Text style={styles.dontHaveOTP}>{language.ONBOARDING__OTP_DONT_HAVE_OTP}<Text style={styles.disabledLink}>{language.ONBOARDING__RESEND_SMS_MESSAGE} {this.state.secondsRemaining}s</Text></Text></View>
              : <SinarmasButton buttonType='link' style={styles.resendOtp} onPress={this.resendOTP} disabled={this.state.resending}>
                <Text style={styles.resendOtpButton}>
                  {language.ONBOARDING__OTP_RESEND}
                </Text>
              </SinarmasButton>
            }
          </View>
          <View style={styles.containerDetail}>
            <Text style={styles.otpDetailTop}>{language.ONBOARDING__OTP_MORE_INFO}</Text>
            <View style={styles.otpDetail}>
              <View style={styles.modalTextLeftContainer}><Text style={styles.otpDetail}>1.</Text></View>
              <View style={styles.modalTextRightContainer}><Text style={styles.otpDetail}>{language.ONBOARDING__OTP_MORE_INFO_SUBTITLE}</Text></View>
            </View>
            <View style={styles.otpDetail}>
              <View style={styles.modalTextLeftContainer}><Text style={styles.otpDetail}>2.</Text></View>
              <View style={styles.modalTextRightContainer}><Text style={styles.otpDetail}>{language.ONBOARDING__OTP_MORE_INFO_SUBTITLE_2}</Text></View>
            </View>
          </View>
        </View>
        <View style={styles.buttonOtpSubmit}>
          <SinarmasButtonOnboarding dtActionName={noCard ? dtNocard + 'Input SMS OTP' : productName ? 'Open ' + productName + ' - Input SMS OTP' : 'Input SMS OTP'} onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} style={styles.buttonOtpSubmitSimas} >
            <Text style={styles.buttonOtpSubmitPage}>
              {language.GENERIC__CONTINUE}
            </Text>
          </SinarmasButtonOnboarding>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

EMoneyActivationOTP.propTypes = {
  handleSubmit: PropTypes.func,
  resendOTP: PropTypes.func,
  setOTP: PropTypes.func,
  transRefNum: PropTypes.string,
  TXID: PropTypes.string,
  userId: PropTypes.number,
  moreInfo: PropTypes.func,
  currentLanguage: PropTypes.string,
  mobileNumber: PropTypes.string,
  navigation: PropTypes.object,
  productName: PropTypes.object
};

export default EMoneyActivationOTP;
