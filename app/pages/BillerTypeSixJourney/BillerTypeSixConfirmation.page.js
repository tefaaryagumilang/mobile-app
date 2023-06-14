import React from 'react';
import PropTypes from 'prop-types';
import BillerTypeSixConfirmation from '../../components/BillerTypeSixJourney/BillerTypeSixConfirmation.component';
import {payGenericBillTypeSix, confirmGenericBillTypeSix, triggerAuthBillpay, checkValidityCouponLogin, registerAutoDebit} from '../../state/thunks/genericBill.thunks';
import {couponCustomer, removeCoupon, showFavoriteTransfer, removeFavorite} from '../../state/thunks/common.thunks';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {find, split, forEach, clone, uniq, filter} from 'lodash';
import {checkShariaAccount, getFilteredBillerData, formatMobileNumberEmoney} from '../../utils/transformer.util';
// import indexOf from 'lodash/indexOf';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
import moment from 'moment';
// let Analytics = firebase.analytics();
import {validateRequiredFields} from '../../utils/validator.util';

const formConfig = {
  form: 'BillerTypeSixConfirmationForm',
  destroyOnUnmount: false,
  initialValues: {
    description: '',
  },
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['description']),      
    };
    return {
      ...errors
    };
  },
  onSubmit: (values, dispatch, {resData = {}, payBill, currentAmount, confirmData, navigation, isLogin, isSyariah, history, billerCodeNewNeedOTP, couponCheck, autoDebitDate, favoriteBill, billerFavorite}) => {
    const biller = result(navigation, 'state.params.biller', {});
    const subsNumber = result(resData, 'subscriberNoInput', '');
    const isFavorite = !isEmpty(find(billerFavorite, (fav) => subsNumber === fav.subscriberNo && biller.id === fav.billerId));
    const listLastHistory = result(history, 'savedBillPaymentList', []);
    const subsNum = result(resData, 'subscriberNoInput', '');
    const codeBillPay = isEmpty(result(resData, 'billPaymentMerchantCode', '')) ? result(resData, 'billerCode', '') : result(resData, 'billPaymentMerchantCode', '');
    const billerOtp =  split(billerCodeNewNeedOTP, ',');
    let isBillpayOtp = false;
    // const resDataTemp = result(navigation, 'state.params.resData', {});
    forEach(billerOtp, (value) => {
      if (codeBillPay === value) {
        isBillpayOtp = true;
      }
    });
    const isNewSubs = isEmpty(find(listLastHistory, (trx) => formatMobileNumberEmoney(subsNum) === formatMobileNumberEmoney(trx.subscriberNo)));

    let sendSmsOtp = false;
    if (isBillpayOtp) {
      if (isNewSubs) {
        sendSmsOtp = true;
      } else {
        sendSmsOtp = false;
      }
    } else {
      sendSmsOtp = false;
    }
    const billAmounts = result(resData, 'billAmount', 0) > 0 ? result(resData, 'billAmount', 0) : result(resData, 'amount', 0);
    let billerNameDt;
    if (result(biller, 'name', '') === 'Go-Pay Customer') {
      billerNameDt = 'Gopay';
    } else {
      billerNameDt = result(biller, 'name', '');
    }
    let dtNameGlobal = '';
    if (!isEmpty(billerNameDt)) {
      const isPrepaidTelco = result(biller, 'billerPreferences.category', '') === 'Pulsa Prepaid';
      const isPostpaidTelco = result(biller, 'billerPreferences.category', '') === 'Pulsa Postpaid';
      const isbillerType = result(biller, 'billerPreferences.billerType', '') === '2' || result(biller, 'billerPreferences.billerType', '') === '3' ||
      result(biller, 'billerPreferences.billerType', '') === '4' || result(biller, 'billerPreferences.billerType', '') === '5' || result(biller, 'billerPreferences.billerType', '') === '8' ||
      result(biller, 'billerPreferences.billerType', '') === '9' || result(biller, 'billerPreferences.billerType', '') === '10';
      if (billerNameDt === 'PLN Postpaid' || billerNameDt === 'PLN Prepaid' || billerNameDt === 'PLN Non Taglis' || isbillerType) {
        dtNameGlobal = billerNameDt;
      } else if (isPrepaidTelco) {
        dtNameGlobal = 'Prepaid Telco';
      } else if (isPostpaidTelco) {
        dtNameGlobal = 'Postpaid Telco';
      } else {
        dtNameGlobal = 'Biller ' + billerNameDt;
      }
    }
    const params = {onSubmit: payBill, amount: billAmounts, isOtp: sendSmsOtp, dynatrace: dtNameGlobal};
    const triggerAuthData = {amount: billAmounts, params};
    const isBiller = true;
    const isbillerOtp = true;
    const confirmFunction = () => {
      dispatch(confirmGenericBillTypeSix({autoDebitDate, ...confirmData}, true, isbillerOtp)).then(() => {
        dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
      });
    };
    // const checkingCIF = checkingCIFbeforeLogin;
    // const limitBeforeLogin = configLimit;
    // const searchIndexComma = indexOf(limitBeforeLogin, ',');
    // const setLimitCIF = checkingCIF ? limitBeforeLogin.substring(0, searchIndexComma) : limitBeforeLogin.substring(searchIndexComma + 1, limitBeforeLogin.length);
    // const allAmount = result(resDataTemp, 'amount', 0);
    const dataLogin = {currentAmount, triggerAuthData, isSyariah, isBiller};
    const otpYes = isNewSubs && isBillpayOtp;

    if (!isLogin) {
      if (isNewSubs && isBillpayOtp) {
        const afterCheckCouponFunction = () => {
          dispatch(confirmGenericBillTypeSix({autoDebitDate, ...confirmData}, true, isbillerOtp, dataLogin, otpYes));
        };
        const biller = result(navigation, 'state.params.biller', {});
        const idAccountSelected = result(navigation, 'state.params.accountNo.id', ''); 
        const amount = result(navigation, 'state.params.resData.amountNumber', '0').toString();
        if (!isEmpty(couponCheck)) {
          dispatch(checkValidityCouponLogin(amount, isLogin, biller, idAccountSelected, afterCheckCouponFunction));
        } else {
          dispatch(confirmGenericBillTypeSix({autoDebitDate, ...confirmData}, true, isbillerOtp, dataLogin, otpYes));
        }
      } else {
        const afterCheckCouponFunction = () => {
          dispatch(confirmFunction);
        };
        const biller = result(navigation, 'state.params.biller', {});
        const idAccountSelected = result(navigation, 'state.params.accountNo.id', ''); 
        const amount = result(navigation, 'state.params.resData.amountNumber', '0').toString();
        if (!isEmpty(couponCheck)) {
          dispatch(checkValidityCouponLogin(amount, isLogin, biller, idAccountSelected, afterCheckCouponFunction));
        } else {
          dispatch(confirmFunction);
        }
      }
    } else {
      const afterCheckCouponFunction = () => {
        dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
      };
      const biller = result(navigation, 'state.params.biller', {});
      const idAccountSelected = result(navigation, 'state.params.accountNo.id', ''); 
      const amount = result(navigation, 'state.params.resData.amountNumber', '0').toString();
      if (!isEmpty(couponCheck)) {
        dispatch(checkValidityCouponLogin(amount, isLogin, biller, idAccountSelected, afterCheckCouponFunction));
      } else if (!isEmpty(couponCheck)) {
        dispatch(checkValidityCouponLogin(amount, isLogin, biller, idAccountSelected, afterCheckCouponFunction));
      } else if (isFavorite && favoriteBill === '') {
        dispatch(showFavoriteTransfer());
        dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
      } else {
        dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
      } 
    }

    // if (Number(setLimitCIF) < Number(allAmount) && !isLogin) {
    //   Toast.show(language.SET_AUTODEBIT_EXCEED_LIMIT, Toast.LONG);
    // } else {
    //   if (!isLogin) {
    //     if (isNewSubs && isBillpayOtp) {
    //       const afterCheckCouponFunction = () => {
    //         dispatch(confirmGenericBillTypeSix({autoDebitDate, ...confirmData}, true, isbillerOtp, dataLogin, otpYes));
    //       };
    //       const biller = result(navigation, 'state.params.biller', {});
    //       const idAccountSelected = result(navigation, 'state.params.accountNo.id', ''); 
    //       const amount = result(navigation, 'state.params.resData.amountNumber', '0').toString();
    //       if (!isEmpty(couponCheck)) {
    //         dispatch(checkValidityCouponLogin(amount, isLogin, biller, idAccountSelected, afterCheckCouponFunction));
    //       } else {
    //         dispatch(confirmGenericBillTypeSix({autoDebitDate, ...confirmData}, true, isbillerOtp, dataLogin, otpYes));
    //       }
    //     } else {
    //       const afterCheckCouponFunction = () => {
    //         dispatch(confirmFunction);
    //       };
    //       const biller = result(navigation, 'state.params.biller', {});
    //       const idAccountSelected = result(navigation, 'state.params.accountNo.id', ''); 
    //       const amount = result(navigation, 'state.params.resData.amountNumber', '0').toString();
    //       if (!isEmpty(couponCheck)) {
    //         dispatch(checkValidityCouponLogin(amount, isLogin, biller, idAccountSelected, afterCheckCouponFunction));
    //       } else {
    //         dispatch(confirmFunction);
    //       }
    //     }
    //   } else {
    //     const afterCheckCouponFunction = () => {
    //       dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
    //     };
    //     const biller = result(navigation, 'state.params.biller', {});
    //     const idAccountSelected = result(navigation, 'state.params.accountNo.id', ''); 
    //     const amount = result(navigation, 'state.params.resData.amountNumber', '0').toString();
    //     if (!isEmpty(couponCheck)) {
    //       dispatch(checkValidityCouponLogin(amount, isLogin, biller, idAccountSelected, afterCheckCouponFunction));
    //     } else {
    //       dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
    //     }
    //   }

    // }
  }
};

const ConnectedForm = reduxForm(formConfig)(BillerTypeSixConfirmation);

class BillerTypeSixConfirmationPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    payBill: PropTypes.func,
    payGenericBillTypeSix: PropTypes.func,
    checkCoupon: PropTypes.func,
    removeCoupon: PropTypes.func,
    couponUse: PropTypes.string,
    timeEndCoupon: PropTypes.string,
    gapTimeServer: PropTypes.number,
    timeStartCoupon: PropTypes.string,
    dateEndCoupon: PropTypes.string,
    dateStartCoupon: PropTypes.string,
    usingFromLine: PropTypes.string,
    minAmount: PropTypes.number,
    maxAmount: PropTypes.number,
    showFavorite: PropTypes.func,
    favoriteBill: PropTypes.string,
    removeFavorite: PropTypes.func,
    billerFavorite: PropTypes.array,
    saveAlias: PropTypes.func,
    currency: PropTypes.string,
    isLogin: PropTypes.bool,
    billpayHistory: PropTypes.array,
    billerConfig: PropTypes.object,
    billerCodeNewNeedOTP: PropTypes.string,
    isUseSimas: PropTypes.bool,
    configLimit: PropTypes.string,
    checkingCIFbeforeLogin: PropTypes.bool,
    isAutoDebit: PropTypes.object,
    autoDebitDate: PropTypes.string,
    setAsAutodebit: PropTypes.func,
    couponCheck: PropTypes.object,
    form: PropTypes.object,
    favForm: PropTypes.object,
  };

  state={
    voucherDescription: '',
  }

  componentWillReceiveProps (newProps) {
    this.setState({voucherDescription: result(newProps, 'couponUse', '')});
  }
  payBill = () => {
    const {payGenericBillTypeSix, isLogin, navigation, isUseSimas, isAutoDebit, autoDebitDate, setAsAutodebit, favForm} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const data = {...navParams, isUseSimas, favForm};
    const isBillPay = !isLogin;
    const nextAutodebit = autoDebitDate ? moment(autoDebitDate, 'DD').add(1, 'M').format('YYYY-MM-DD').toString() : '';
    const isADebit = result(navParams, 'isADebit', false);
    const isRegular = result(isAutoDebit, 'isRegular') === true;
    const registerAutodebitOnly = isADebit && isRegular;
    if (registerAutodebitOnly) {
      setAsAutodebit({nextAutodebit, registerAutodebitOnly, ...data});
    } else {
      payGenericBillTypeSix({nextAutodebit, ...data}, isBillPay);
    }
  }

  componentWillMount () {
    const {couponUse} = this.props;
    this.setState({voucherDescription: couponUse});
    // const code = result(biller, 'billerPreferences.code', '');
    // const billCode = code.concat('-3');
    // const os = Platform.OS;
    // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});

  }

  goToCoupon = () => {
    const {navigation, checkCoupon, currency} = this.props;
    const idAccountSelected = result(navigation, 'state.params.accountNo.id', ''); 
    const amount = result(navigation, 'state.params.resData.amountNumber', '0').toString();
    const navParams = result(navigation, 'state.params', {});
    const isSyariah = checkShariaAccount(result(navParams, 'accountNo', {})) && currency !== 'simaspoin';
    if (isSyariah) {
      Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
    } else {
      checkCoupon(amount, '', idAccountSelected);
    }
  }

  getHistory = () => {
    const {navigation = {}, billerConfig, billpayHistory} = this.props;
    const biller = result(navigation, 'state.params.biller', {});
    const savedBillPaymentList = result(billpayHistory, 'savedBillPaymentList', []);
    let history = {};
    history = clone(billpayHistory);
    if (isEmpty(biller)) {
      const billers = getFilteredBillerData(billerConfig, 'TOPUP');
      let historyTopup = [];
      forEach(billers, (biller) => {
        const id = result(biller, 'id', 0);
        const billPaymentList = filter(savedBillPaymentList, (historyItem) => historyItem.billerId === id);
        historyTopup = uniq([...historyTopup, ...billPaymentList]);
      });
      return history;
    } else {
      const newBillPaymentList = filter(savedBillPaymentList, (historyItem) => historyItem.billerId === biller.id);
      history.savedBillPaymentList = newBillPaymentList;
      return history;
    }
  }

  render () {
    const {triggerAuth, removeCoupon, timeEndCoupon, gapTimeServer, navigation, checkingCIFbeforeLogin = false, timeStartCoupon, configLimit, dateEndCoupon, dateStartCoupon, usingFromLine, minAmount, maxAmount, showFavorite, favoriteBill, removeFavorite, billerFavorite, currency, billerCodeNewNeedOTP, isLogin, couponCheck, isAutoDebit, autoDebitDate, favForm} = this.props;
    const navParams = this.props.navigation.state.params;
    const billerConfig = this.props;
    const amount = parseInt(result(navigation, 'state.params.resData.amountNumber', '0'));
    const isUseSimas = result(navParams, 'accountNo.isUseSimas', '');
    const isSyariah = checkShariaAccount(result(navParams, 'accountNo', {})) && currency !== 'simaspoin';
    const history = this.getHistory();
    const isADebit = result(navParams, 'isADebit', false);
    const biller = result(navigation, 'state.params.biller', {});
    const resData = result(navigation, 'state.params.resData', {});
    const subsNumber = result(resData, 'subscriberNoInput', '');
    const isFavorite = !isEmpty(find(billerFavorite, (fav) => subsNumber === fav.subscriberNo && biller.id === fav.billerId));
    const disabled = isEmpty(result(favForm, 'description', '')); 
    return <ConnectedForm {...navParams} removeCoupon={removeCoupon} timeEndCoupon={timeEndCoupon} gapTimeServer={gapTimeServer} couponUse={this.state.voucherDescription}
      timeStartCoupon={timeStartCoupon} dateEndCoupon={dateEndCoupon} dateStartCoupon={dateStartCoupon} usingFromLine={usingFromLine} minAmount={minAmount} maxAmount={maxAmount} currentAmount={amount}
      goToCoupon={this.goToCoupon} triggerAuth={triggerAuth} payBill={this.payBill} showFavorite={showFavorite} favoriteBill={favoriteBill} removeFavorite={removeFavorite}
      billerFavorite={billerFavorite} isSyariah={isSyariah} billerConfig={billerConfig} isUseSimas={isUseSimas}
      configLimit={configLimit} checkingCIFbeforeLogin={checkingCIFbeforeLogin} history={history} billerCodeNewNeedOTP={billerCodeNewNeedOTP} isLogin={isLogin} navigation={navigation}
      couponCheck={couponCheck} isAutoDebit={isAutoDebit} isADebit={isADebit} autoDebitDate={autoDebitDate} isFavorite={isFavorite} favForm={favForm} disabled={disabled}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  payGenericBillTypeSix: (data, isBillPay) => dispatch(payGenericBillTypeSix(data, isBillPay)),
  checkCoupon: (dataValue, billertype, accountId) => dispatch(couponCustomer(dataValue, billertype, accountId)),
  removeCoupon: () => dispatch(removeCoupon()),
  showFavorite: () => {
    dispatch(showFavoriteTransfer());
  },
  removeFavorite: () => {
    dispatch(removeFavorite());
  },
  setAsAutodebit: (data) => dispatch(registerAutoDebit(data)),
});
const mapStateToProps = ({transRefNum, checkingCIFbeforeLogin, config, user, couponCheck, gapTimeServer, billerDescFav, billerFavorite, billpayHistory, billerConfig, flagAutoDebit, form}) => ({
  transRefNum, config: result(config, 'tokenConfig', []),
  isLogin: !isEmpty(user),
  userId: result(user, 'profile.customer.id', 0),
  couponUse: result(couponCheck, 'description', ''),
  timeEndCoupon: result(couponCheck, 'endTimeMod', ''),
  timeStartCoupon: result(couponCheck, 'startTimeMod', ''),
  dateEndCoupon: result(couponCheck, 'subendDate', ''),
  dateStartCoupon: result(couponCheck, 'subnewDate', ''),
  usingFromLine: result(couponCheck, 'usingFromLine', '0'),
  minAmount: result(couponCheck, 'minAmount', 0),
  maxAmount: result(couponCheck, 'maxAmount', 0),
  favoriteBill: result(billerDescFav, 'isFavorite', ''),
  billerFavorite,
  gapTimeServer,
  currency: result(couponCheck, 'currency', 'simaspoin'),
  billpayHistory,
  billerConfig,
  billerCodeNewNeedOTP: result(config, 'billerCodeNewNeedOTP', ''),
  configLimit: result(config, 'limitConfigAutoDebetAccount', ''),
  checkingCIFbeforeLogin,
  isAutoDebit: flagAutoDebit,
  autoDebitDate: result(flagAutoDebit, 'date', ''),
  couponCheck,
  form,
  favForm: result(form, 'BillerTypeSixConfirmationForm.values', ''),

});

export default connect(mapStateToProps, mapDispatchToProps)(BillerTypeSixConfirmationPage);
