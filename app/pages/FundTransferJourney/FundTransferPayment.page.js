import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import FundTransferPayment from '../../components/FundTransferJourney/FundTransferPayment.component';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {validateRequiredFields, isInRange, validateMaxTransferAmount, validateMaxTransferNetwork, isPrk, validateBalance, isInRangeValas, validateBalanceValas, validateMaxTransactionAmount, validateMaxTransferAmountSetLimit} from '../../utils/validator.util';
import {getAccountAmount, getTransferPossibleAccounts, getPayeeType} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {confirmTransfer, silentLoginBillpay, popUpSetLimitShortCut} from '../../state/thunks/fundTransfer.thunks';
import startsWith from 'lodash/startsWith';
import find from 'lodash/find';
import {getValas} from '../../state/thunks/common.thunks';
import groupBy from 'lodash/groupBy';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';

const formConfig = {
  form: 'fundTransfer',
  destroyOnUnmount: true,
  initialValues: {
    myAccount: {},
    amount: '',
    note: '',
  },
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['amount']),      
    };
    return {
      ...errors
    };
  }
};

const DecoratedFundTransferPayment = reduxForm(formConfig)(FundTransferPayment);

class FundTransferPaymentPage extends Component {
  static propTypes = {
    goToSummary: PropTypes.func,
    setup: PropTypes.func,
    accountList: PropTypes.array,
    navigation: PropTypes.object,    
    dispatch: PropTypes.func,
    formValues: PropTypes.object,
    appConfig: PropTypes.object,
    gapTimeServer: PropTypes.number,
    goToPaymentMethod: PropTypes.func,
    goToSchedule: PropTypes.func,
    payeeAccNo: PropTypes.string,
    unregisteredName: PropTypes.string,
    getSourceAcc: PropTypes.func,
    selectedSourceAcc: PropTypes.object,
    changeFormValues: PropTypes.func,
    setAmount: PropTypes.func,
    isSplitBill: PropTypes.bool,
    dataTransRefNum: PropTypes.string,
    isLogin: PropTypes.bool,
    getValas: PropTypes.func,
    getCurrency: PropTypes.func,
    isValas: PropTypes.string,
    accounts: PropTypes.array,
    setNewSof: PropTypes.func,
    destroyFormSB: PropTypes.func,
    payeeList: PropTypes.array,   
    goSetPayee: PropTypes.func,
    popUpSetLimitShortCut: PropTypes.func
  };
  
  state = {
    scheduled: false,
    isValas: false,
  }

  checkboxChange = () => {
    const {navigation, formValues} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const payeeCurrency = result(payee, 'currency', '');
    const sourceCurrency = result(formValues, 'myAccount.currency', '');
    const isSourceIDR = sourceCurrency !== 'IDR' && sourceCurrency !== '';
    const isPayeeIDR = payeeCurrency !== 'IDR' && payeeCurrency !== '';
    let isValas = isSourceIDR || isPayeeIDR;
    const scheduled = !this.state.scheduled;
    
    if (isValas) {
      if (sourceCurrency === payeeCurrency) {
        this.setState({scheduled});
      } else {
        Toast.show(language.EXCHANGE__RATES_VALAS);
      }
    } else {
      this.setState({scheduled});
    }
    
  }


  
  onNext = (currencyRate = []) => {
    const {goToPaymentMethod, formValues, navigation, goToSummary, goToSchedule, dispatch, isLogin, getCurrency} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const isKyc = result(navigation, 'state.params.isKyc', false);
    const toEmoney = result(payee, 'payeeType.value', 'bank') === 'emoney' || result(payee, 'accountType', '') === 'emoneyAccount';
    const fromEmoney = result(formValues, 'myAccount.accountType', 'bank') === 'emoneyAccount';
    const toOtherBank = getPayeeType(payee) === 'external';
    const isNetwork = fromEmoney && toOtherBank;
    const isSplitBill = result(navigation, 'state.params.isSplitBill');
    const invoiceNumber = result(navigation, 'state.params.invoiceNumber', '');
    const dataTransRefNum = result(navigation, 'state.params.dataTransRefNum', '');
    const payeeCurrency = result(payee, 'currency', '');
    const sourceCurrency = result(formValues, 'myAccount.currency', '');
    const isSourceIDR = sourceCurrency !== 'IDR' && sourceCurrency !== '';
    const isPayeeIDR = payeeCurrency !== 'IDR' && payeeCurrency !== '';
    const isBiFast = result(navigation, 'state.params.payee.isBiFast', false);
    let isValas = isSourceIDR || isPayeeIDR;
    const dynatrace = result(navigation, 'state.params.dynatrace', '');
    if (this.state.scheduled) {
      goToSchedule(payee, formValues, getCurrency, currencyRate, isValas, isKyc);
    } else {
      if (getPayeeType(payee, isNetwork) === 'internal' || toEmoney || isNetwork || isValas || isBiFast) {
        if ((isEmpty(formValues.currency)) || (formValues.currency.name === 'IDR' || formValues.currency.name !== 'IDR')) {
          goToSummary(payee, formValues, getCurrency, currencyRate, {}, isValas, isKyc, isBiFast, isSplitBill, dataTransRefNum, invoiceNumber, dynatrace);
        }
      } else {
        if (isLogin) {
          goToPaymentMethod(payee, formValues, getCurrency, currencyRate, dynatrace);
        } else {
          dispatch(silentLoginBillpay());
          goToPaymentMethod(payee, formValues, getCurrency, currencyRate, dynatrace);
        }
      }
    }
  }
  
  selectSourceAcc = () => {
    const {getSourceAcc, navigation, formValues, getCurrency, dispatch} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const isSplitBill = result(navigation, 'state.params.isSplitBill');
    const isTopup = result(payee, 'accountType', '') === 'emoneyAccount' && result(payee, 'transferType', '') === 'own';
    const currencySource = result(formValues, 'myAccount.currency', '');
    const isSourceIDR = currencySource !== 'IDR';
    const isPayeeIDR = currency !== 'IDR' && currency !== '';
    let isValas = isSourceIDR || isPayeeIDR;
    const isBiFast = result(navigation, 'state.params.payee.isBiFast', false);
    const isEmoney = payee.accountType === 'emoneyAccount';
    const dynatrace = isEmoney ? 'Simas Emoney - Topup' : result(navigation, 'state.params.dynatrace', '');
    getSourceAcc(payee, isTopup, isValas, isBiFast, isSplitBill, dynatrace);
    const currency = result(payee, 'currency', '');
    const currrencyList = groupBy(getCurrency, 'currency', []);
    let currencyRate = [];
    const currencyDeterminant = result(formValues, 'currency.name', currencySource);
    const currencyTarget = currency !== currencySource ? [currencySource, currency] : [currency];
    dispatch(change('fundTransfer', 'currency', currencyTarget));
    if (currencySource !== 'IDR' && currency !== 'IDR') {
      // untuk valas to valas
      const buyRateTarget = parseInt(result(currrencyList, `${currency}` + '.0.spreadBuyRate', 0));
      const sellRateTarget = parseInt(result(currrencyList, `${currency}` + '.0.spreadSellRate', 0));
      const buyRateSource = parseInt(result(currrencyList, `${currencySource}` + '.0.spreadBuyRate', 0));
      const sellRateSource = parseInt(result(currrencyList, `${currencySource}` + '.0.spreadSellRate', 0));
      const toTargetCurrency = buyRateTarget / sellRateSource;
      const toSourceCurrency = buyRateSource / sellRateTarget;
      currencyRate['toTargetAcc'] = toTargetCurrency;
      currencyRate['fromTargetAcc'] = toSourceCurrency;
      currencyRate['currency'] = currency;
      currencyRate['currencySource'] = currencySource;
      currencyRate['currencyDeterminant'] = currencyDeterminant;
    } else if (currencySource !== 'IDR' && currency === 'IDR') {
      // untuk valas ke idr
      const buyRateSource = parseInt(result(currrencyList, `${currencySource}` + '.0.spreadBuyRate', 0));
      const sellRateSource = parseInt(result(currrencyList, `${currencySource}` + '.0.spreadSellRate', 0));
      const toTargetCurrency = 1 / sellRateSource;
      const toSourceCurrency = 1 * buyRateSource;
      currencyRate['toTargetAcc'] = toTargetCurrency;
      currencyRate['fromTargetAcc'] = toSourceCurrency;
      currencyRate['currency'] = currency;
      currencyRate['currencySource'] = currencySource;
      currencyRate['currencyDeterminant'] = currencyDeterminant;
      
    } else if (currencySource === 'IDR' && currency !== 'IDR') {
      // untuk idr to valas
      const buyRateTarget = parseInt(result(currrencyList, `${currency}` + '.0.spreadBuyRate', 0));
      const sellRateTarget = parseInt(result(currrencyList, `${currency}` + '.0.spreadSellRate', 0));
      const toTargetCurrency = 1 / sellRateTarget;
      const toSourceCurrency = 1 * buyRateTarget;
      currencyRate['toTargetAcc'] = toTargetCurrency;
      currencyRate['fromTargetAcc'] = toSourceCurrency;
      currencyRate['currency'] = currency;
      currencyRate['currencySource'] = currencySource;
      currencyRate['currencyDeterminant'] = currencyDeterminant;
    } else if (currencySource === 'IDR' && currency === 'IDR') {
      // untuk idr ke idr
      currencyRate['toTargetAcc'] = 0;
      currencyRate['fromTargetAcc'] = 0;
      currencyRate['currency'] = currency;
      currencyRate['currencySource'] = currencySource;
      currencyRate['currencyDeterminant'] = currencyDeterminant;
      
    }
  }

  componentDidMount () {
    const {navigation, setAmount, getValas, getCurrency, formValues, accounts, setNewSof, destroyFormSB} = this.props;
    const isSplitBill = result(navigation, 'state.params.isSplitBill');
    if (isSplitBill) {
      destroyFormSB();
    }
    if (isEmpty(getCurrency)) {
      getValas();
    }
    const navParams = result(navigation, 'state.params', {});
    const splitBillAmount = result(navParams, 'amountBill', '');
    const payeeAmount = result(navParams, 'payee.amount', '');
    const amount = splitBillAmount === null ? payeeAmount : splitBillAmount !== null ? splitBillAmount : null;
    const favAmount = amount === null ? '' : amount.toString();
    const checkAmt = Number(favAmount);
    checkAmt !== 0 && setAmount('amount', favAmount);
    if (!isEmpty(formValues)) {
      const currentSof = result(formValues, 'myAccount.accountNumber', {});
      const newSof = find(accounts, {accountNumber: currentSof});
      setNewSof(newSof);
    }
  }
  
  goOnPage = () => {
    const {navigation, goSetPayee} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const payeeNumber = (result(payee, 'accountNumber', ''));
    const payeeName = result(payee, 'name', '');    
    const bank = result(payee, 'bank.bankName', '');    
    const currency = result(payee, 'currency', '');    
    const id = result(payee, 'id', '');    
    const targetType = result(payee, 'targetType', '');    
    const transferType = result(payee, 'transferType', '');    
    const accountType = result(payee, 'accountType', '');
    goSetPayee(payeeNumber, payeeName, bank, currency, id, targetType, transferType, accountType);
  }
  
  render () {
    const {navigation, accountList, formValues, appConfig, unregisteredName, getCurrency, payeeList} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const isSplitBill = result(navigation, 'state.params.isSplitBill');
    const invoiceNumber = result(navigation, 'state.params.invoiceNumber', '');
    const dataTransRefNum = result(navigation, 'state.params.dataTransRefNum', '');
    const payeeNumber = (result(payee, 'accountNumber', ''));
    const payeeName = result(payee, 'name', '');
    const transferType = result(payee, 'transferType', '');
    const accountType = result(payee, 'accountType', '');    
    const currencyIDR = result(payee, 'currency', '');
    const tokenConfig = result(appConfig, 'tokenConfig', {});
    const transferChargeConfig = result(appConfig, 'tokenConfig.1', {});
    const prkList = result(appConfig, 'prkPrefixCSV', '');
    const accounts = payee.name === unregisteredName && startsWith(payee.accountNumber, '3808') ? [find(accountList, {accountType: 'emoneyAccount'})] : accountList;
    const disabled = isEmpty(result(formValues, 'myAccount', {}));
    const fromEmoney = result(formValues, 'myAccount.accountType', 'bank') === 'emoneyAccount';
    const toOtherBank = getPayeeType(payee) === 'external';
    const isNetwork = fromEmoney && toOtherBank;
    const accountBalance = getAccountAmount(result(formValues, 'myAccount', {}));
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const errors = [];
    const maxAmountError = isNetwork ? validateMaxTransferNetwork(formValues.amount, transferChargeConfig) : validateMaxTransferAmount(formValues.amount, transferChargeConfig) && validateMaxTransferAmountSetLimit(formValues.amount);
    const passValidateAmount = isPrk(prkList, result(formValues, 'myAccount', {}));
    // const amount = passValidateAmount ? undefined : (validateBalance(accountBalance, formValues.amount) || maxAmountError);
    // errors['amountLess'] = formValues.amount < 1000 ? (isInRange(1000, accountBalance, formValues.amount)) : undefined;
    // errors['amount'] = amount;
    const currencyPayee = result(payee, 'currency', '');
    const currrencyList = groupBy(getCurrency, 'currency', []);
    const currrencyListUsd = groupBy(getCurrency, 'changeCurrency', []);
    const currency = isEmpty(currencyPayee) ? 'IDR' : currencyPayee;
    const currencySource = isEmpty(result(formValues, 'myAccount.currency', '')) ? 'IDR' : result(formValues, 'myAccount.currency', '');
    const currencyTarget = currency !== currencySource ? [currencySource, currency] : [currency];
    const currencyDeterminant = result(formValues, 'currency.name', currencySource);
    const isEmoney = result(payee, 'accountType', '') === 'emoneyAccount';
    const dynatrace = result(navigation, 'state.params.dynatrace', '');
    let currencyRate = [];
    let currencyIndicator = 'noValas';
    if (isEmpty(currency)) {
      currencyIndicator = 'noValas';
    } else {
      currencyIndicator = currencySource !== 'IDR' && currency !== 'IDR' && currency !== currencySource ? 'fullValas' :
        currencySource !== 'IDR' && currency !== 'IDR' && currency === currencySource ? 'sameValas' :
          currencySource !== 'IDR' || currency !== 'IDR' ? 'halfValas' : 'noValas';
    }
    
    if (currency === 'IDR') {
      if (currencySource !== 'IDR' && currencySource !== 'USD') {
        const currencyObject = result(currrencyList, `${currencySource}`, {});
        currencyRate['currencyObject'] = currencyObject;
      } else if (currencySource === 'USD') {
        const currencyObject = result(currrencyList, `${currencySource}`, {});
        currencyRate['currencyObject'] = currencyObject;
      }
    } else if (currency === 'USD') {
      if (currencySource !== 'IDR' && currencySource !== 'USD') {
        // SPECIAL CASE
        const currencyObject = result(currrencyListUsd, `${currencySource}`, {});
        currencyRate['currencyObject'] = currencyObject;
        const currencyObjectAdditional = result(currrencyList, `${currencySource}`, {});
        currencyRate['currencyObjectAdditional'] = currencyObjectAdditional;
      } else if (currencySource === 'USD') {
        const currencyObject = result(currrencyList, `${currencySource}`, {});
        currencyRate['currencyObject'] = currencyObject;
      } else if (currencySource === 'IDR') {
        const currencyObject = result(currrencyList, `${currency}`, {});
        currencyRate['currencyObject'] = currencyObject;
      }
    } else if (currency !== 'IDR' && currency !== 'USD') {
      if (currencySource === 'IDR') {
        const currencyObject = result(currrencyList, `${currency}`, {});
        currencyRate['currencyObject'] = currencyObject;
      } else if (currencySource === 'USD') {
        // SPECIAL CASE
        const currencyObject = result(currrencyListUsd, `${currency}`, {});
        currencyRate['currencyObject'] = currencyObject;
        const currencyObjectAdditional = result(currrencyList, `${currency}`, {});
        currencyRate['currencyObjectAdditional'] = currencyObjectAdditional;
        
      } else if (currencySource !== 'IDR' && currencySource !== 'USD') {
        const currencyObject = result(currrencyList, `${currencySource}`, {});
        currencyRate['currencyObject'] = currencyObject;
      }
    }
    currencyRate['currency'] = currency;
    currencyRate['currencySource'] = currencySource;
    currencyRate['currencyDeterminant'] = currencyDeterminant;
    currencyRate['currencyIndicator'] = currencyIndicator;

    const isSourceIDR = currencySource !== 'IDR';
    const isPayeeIDR = currency !== 'IDR' && currency !== '';
    let isValas = isSourceIDR || isPayeeIDR;
    const validateOwnAccount = validateMaxTransactionAmount(formValues.amount, result(appConfig, 'tokenConfig', []), result(payee, 'transferType', ''));
    if (currencyIndicator === 'halfValas' || currencyIndicator === 'fullValas' || currencyIndicator === 'sameValas') {
      const amount = passValidateAmount ? undefined : (validateBalanceValas(accountBalance, formValues.amount, '', currencyRate)
      || maxAmountError);
      errors['amountLess'] = (formValues.amount < 1) ? (isInRangeValas(1, accountBalance, formValues.amount, formValues, currencyRate, payee)) : undefined;
      errors['amount'] = isOwnAccount ? validateOwnAccount || isInRangeValas(1, accountBalance, formValues.amount, formValues, currencyRate, payee) : amount;
    } else {
      const amount = passValidateAmount ? undefined : (validateBalance(accountBalance, formValues.amount, '', isSplitBill)
      || maxAmountError);
      errors['amountLess'] = (formValues.amount < 1000) ? (isInRange(1000, accountBalance, formValues.amount)) : undefined;
      errors['amount'] = isOwnAccount ? validateOwnAccount || isInRange(1000, accountBalance, formValues.amount) : amount;
    }

    return (
      <DecoratedFundTransferPayment accountList={accounts} onNextPress={this.onNext} payee={payee}
        getSourceAcc={this.selectSourceAcc} formValues={formValues} tokenConfig={tokenConfig}
        checkboxChange={this.checkboxChange} transferChargeConfig={transferChargeConfig} prkList={prkList}
        amountChange={this.amountChange} disabled={disabled} errors={errors} isOwnAccount={isOwnAccount} currencyRate={currencyRate} invoiceNumber={invoiceNumber}
        currencyTarget={currencyTarget} isValas={isValas} amountNormalise={this.amountNormalise} getCurrency={getCurrency} isSplitBill={isSplitBill} dataTransRefNum={dataTransRefNum}
        goSetPayee={this.goOnPage}
        payeeNumber={payeeNumber}
        payeeName={payeeName}
        payeeList={payeeList}
        transferType={transferType}
        accountType={accountType}
        currencyIDR={currencyIDR}
        isEmoney={isEmoney}        
        dynatrace={dynatrace}
      />
    );
  }
}
  
const mapStateToProps = (state) => ({
  accountList: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
  formValues: result(state, 'form.fundTransfer.values', {}),
  appConfig: result(state, 'config', {}),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  form: state.form,
  unregisteredName: result(state, 'configEmoney.emoneyConfig.pendingAccountName', ''),
  isLogin: !isEmpty(result(state, 'user', {})),
  getCurrency: result(state, 'currencyRates', []),
  accounts: result(state, 'accounts', {}),  
  listAddNew: result(state, 'listLimit', []),  
  getList: result(state, 'configEForm.listConfigEform.listAddNew', []),  
  bankList: result(state, 'valueBankList.bankList', []),  
  payeeList: result(state, 'payees', []),
  
});

const mapDispatchToProps = (dispatch) => ({
  setTransferMode: (mode) => {
    dispatch(change('fundTransfer', 'transferMode', mode));
  },
  goToPaymentMethod: (payee, formValues, getCurrency, currencyRate, dynatrace) => {
    dispatch(NavigationActions.navigate({
      routeName: 'FundTransferMethod',
      params: {formValues, payee, getCurrency, currencyRate, dynatrace}
    }));
  },
  goToSchedule: (payee, formValues, getCurrency, currencyRate, isValas, isKyc) => {
    dispatch(NavigationActions.navigate({
      routeName: 'FundTransferSchedule',
      params: {formValues, payee, getCurrency, currencyRate, isValas, isKyc}
    }));
  },
  goToSummary: (payee, formValues, getCurrency, currencyRate, newformValues, isValas, isKyc, isBiFast, isSplitBill, dataTransRefNum, invoiceNumber, dynatrace) => {
    dispatch(confirmTransfer(formValues, payee, 'fundTransfer', getCurrency, currencyRate, newformValues, isValas, isKyc, isBiFast, isSplitBill, dataTransRefNum, invoiceNumber, dynatrace));
  },
  getSourceAcc: (payee, isTopup, isValas, isBiFast, isSplitBill, dynatrace) => {
    if (isSplitBill) {
      dispatch(NavigationActions.navigate({
        routeName: 'TransferSourceAccountSplitBill',
        params: {formName: 'fundTransfer', fieldName: 'myAccount', sourceType: 'fundTransfer', payee: payee, isTopup: isTopup, isValas: isValas}      
      }));
    } else {
      dispatch(NavigationActions.navigate({
        routeName: 'TransferSourceAccount',
        params: {formName: 'fundTransfer', fieldName: 'myAccount', sourceType: 'fundTransfer', payee: payee, isTopup: isTopup, isValas: isValas, isBiFast: isBiFast, dynatrace: dynatrace}
      }));
    }
  },
  setAmount: (name, amount) => {
    dispatch(change('fundTransfer', name, amount));
  },
  getValas: () => dispatch(getValas()),
  setNewSof: (account) => {
    dispatch(change('fundTransfer', 'myAccount', account));
  },
  destroyFormSB: () => {
    dispatch(change('fundTransfer', 'myAccount', []));
  },  
  goSetPayee: (payeeNumber, payeeName, bank, currency, id, targetType, transferType, accountType) => {
    dispatch(popUpSetLimitShortCut(payeeNumber, payeeName, bank, currency, id, targetType, transferType, accountType));
  },  
  dispatch
 
});
  
const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(FundTransferPaymentPage);
export default connectedTransfer;