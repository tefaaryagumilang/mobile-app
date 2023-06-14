import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import SetLimitEdit, {fields}  from '../../components/FundTransferJourney/SetLimitFromTransferConfirmation.component';
import {validateInputSetLimit, validateRequiredString} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {change} from 'redux-form';
import {isEmpty, result} from 'lodash';
import {inbankList} from '../../state/thunks/common.thunks';
import {setupFundTransferSetLimitVerifyConfirm} from '../../state/thunks/fundTransfer.thunks';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'autoFilledSetLimitConfirm',
  destroyOnUnmount: false,
  validate: (values) => {    
    const errors = {
      ...validateRequiredString(values, [fields.LIMIT_PER_DAY, fields.LIMIT_PER_TRANSACTION]),
    };     
    return {
      limitPerDay: validateInputSetLimit(values.limitPerDay),      
      limitPerTransaction: validateInputSetLimit(values.limitPerTransaction),
      ...errors,
    };
  }, 
  onSubmit: (values, dispatch, {navigation}) => {  
    const payeeName = result(navigation, 'state.params.payeeName', '');  
    const payeeNumber = result(navigation, 'state.params.payeeNumber', '');  
    const payeeTargetAccNo =   result(navigation, 'state.params.targetAccNo', '');    
    const payeeTargetAccName =   result(navigation, 'state.params.targetAccName', ''); 
    dispatch(setupFundTransferSetLimitVerifyConfirm(payeeName, payeeNumber, payeeTargetAccNo, payeeTargetAccName)); 

  }  
};

const mapStateToProps = (state) => ({    
  listAddNew: result(state, 'listLimit', []),
  debitAccountNo: result(state, 'form.fundTransfer.values.myAccount.accountNumber', ''),    
  debitAccountName: result(state, 'form.fundTransfer.values.myAccount.name', ''),
  balance: result(state, 'form.fundTransfer.values.myAccount.balances.availableBalance', ''),    
  productType: result(state, 'form.fundTransfer.values.myAccount.productType', ''),   
  payees: result(state, 'payees', []),    
  creditAccountNo: result(state, 'form.addPayee.values.payeeAccNo', ''),  
  creditAccountName: result(state, 'form.addPayee.values.payeeName', ''),
  getList: result(state, 'configEForm.listConfigEform.listAddNew', []),  
  drawer: result(state, 'drawer', false),
  creditAccountNumber: result(state, 'listLimit.creditAccount', ''),  
  creditAccNo: result(state, 'form.highValueTransfer.values.creditAccountNumber', ''),    
  listCreditAccNo: result(state, 'configEForm.listConfigEform.creditAccNo', []),
  debitAccountNumber: result(state, 'listLimit.debitAccount', ''),  
  debitAccNo: result(state, 'form.fundTransfer.values.accountNumber', ''),    
  listDebitAccNo: result(state, 'configEForm.listConfigEform.debitAccNo', []),    
  debitAccName: result(state, 'form.fundTransfer.values.name', ''),    
  listDebitAccName: result(state, 'configEForm.listConfigEform.debitAccName', []),    
  maximumLimit: result(state, 'listLimit.maximumLimit', []),  
  maxLimit: result(state, 'form.highValueTransfer.values.maximumLimit', ''),    
  maximum: result(state, 'configEForm.listConfigEform.maxLimit', []),
  maximumLimitPerDay: result(state, 'listLimit.maximumLimitPerDay', []),  
  maxLimitPerDay: result(state, 'form.highValueTransfer.values.maximumLimitPerDay', ''),    
  maximumPerDay: result(state, 'configEForm.listConfigEform.maxLimitPerDay', []),    
  amountValueDay: result(state, 'form.setLimitForm1.values.limitPerDay', 0),
  amountValueTransaction: result(state, 'form.setLimitForm1.values.limitPerTransaction', 0),  
  creditAccountList: result(state, 'inbankTransferList', []),  
  listCreditAcc: result(state, 'configEForm.listConfigEform.creditAccountList', []),    
  formValues: result(state, 'form.autoFilledSetLimitConfirm.values', ''),
  creditValues: result(state, 'accounts.creditValues', []),
  sourceCredit: result(state, 'form.setLimitForm2.values.creditValues', 0),   
  listCreditValues: result(state, 'configEForm.listConfigEform.sourceCredit', []), 
  errorNextTrx: result(state, 'form.autoFilledSetLimitConfirm.values.limitPerTransaction', 0),    
  errorNextDay: result(state, 'form.autoFilledSetLimitConfirm.values.limitPerDay', 0),   
  limitPerTransaction: result(state, 'setLimitTransactionEdit.payload.limitPerTransaction', ''),       
  limitPerDay: result(state, 'setLimitTransactionEdit.payload.limitPerDay', ''),
});

const SetFormEdit = reduxForm(formConfig)(SetLimitEdit);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(SetFormEdit);

class LimitTransactionEdit extends Component {

  state = {
    value: 1000000
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('limitPerDay' === typeField) {
      if (isEmpty(validateInputSetLimit(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('limitPerTransaction' === typeField) {
      if (isEmpty(validateInputSetLimit(val))) {
        return true;
      } else {
        return false;
      }
    }
  }



  onthisChangeAmountDay=() => {
    if (this.props.amountValueDay === '') {
      this.setState.iserror;
    } 
  }
  onthisChangeAmountTransaction=() => {
    if (this.props.amountValueTransaction === '') {
      this.setState.iserror;
    } 
  }

  static propTypes = {
    listLimitID: PropTypes.array,
    creditAccountNumber: PropTypes.object,
    listCreditAccNo: PropTypes.array,
    debitAccountNumber: PropTypes.string,
    listDebitAccNo: PropTypes.array,    
    maximumLimit: PropTypes.object,
    maximum: PropTypes.array,    
    maximumLimitPerDay: PropTypes.object,
    maximumPerDay: PropTypes.array,    
    listAddNew: PropTypes.array,    
    getList: PropTypes.array,    
    amountValueDay: PropTypes.string,
    amountValueTransaction: PropTypes.string,
    inbankList: PropTypes.string,
    formValues: PropTypes.object,     
    form: PropTypes.object,   
    getListCreditAcc: PropTypes.func,
    debitAccNo: PropTypes.string,
    listID: PropTypes.string,
    goToEditList: PropTypes.func,
    debitAccountNo: PropTypes.string,    
    debitAccountName: PropTypes.string,    
    productType: PropTypes.string, 
    balance: PropTypes.string,
    creditAccountNo: PropTypes.string,    
    creditAccountName: PropTypes.string,  
    creditAccountList: PropTypes.array,
    creditValues: PropTypes.object,    
    triggerAuth: PropTypes.func,    
    sendVerification: PropTypes.func,    
    setLimitPerDay: PropTypes.func,    
    navigation: PropTypes.object,      
    state: PropTypes.object,
    limitPerDay: PropTypes.string,  
    limitPerTransaction: PropTypes.string,  
    prefilledDebitAccName: PropTypes.func,
    prefilledlimitPerTransaction: PropTypes.func,    
    debitAccName: PropTypes.string,  
    payees: PropTypes.array,
    errorNextTrx: PropTypes.string,
    errorNextDay: PropTypes.string,
    easyPinDataToFundTransferShortcut: PropTypes.func,    
    prefilledlimitPerDay: PropTypes.func,    
  }



  componentWillMount () {
    const {limitPerDay, prefilledlimitPerDay} = this.props;
    prefilledlimitPerDay(limitPerDay);
    const {limitPerTransaction, prefilledlimitPerTransaction} = this.props;
    prefilledlimitPerTransaction(limitPerTransaction);
  }

  render () {
  
    const {state, navigation, triggerAuth, formValues,  inbankList,  maximumLimit, maximum, maximumLimitPerDay, maximumPerDay, listAddNew, getList, amountValueDay, amountValueTransaction, debitAccNo, listID, debitAccountNo, debitAccountName, creditAccountNo, creditAccountName, limitPerDay, limitPerTransaction, debitAccName, productType, balance, errorNextTrx, errorNextDay} = this.props;
    const payee = result(navigation, 'state.params.payee', {});    
    const payeeNumber = (result(payee, 'accountNumber', ''));   
    const payeeName = result(payee, 'name', '');
    const payeeBank =  result(payee, 'payeeBank', '');
    const payeeTargetAccNo =  result(payee, 'targetAccNo', '');
    const payeeTargetAccName =  result(payee, 'targetAccName', '');
    const errorFieldTrxLessthanDay = errorNextDay < errorNextTrx;
    

    return (
      <ConnectedForm      
        inbankList={inbankList}
        maximumLimit={maximumLimit}
        maximum={maximum}
        maximumPerDay={maximumPerDay}
        maximumLimitPerDay={maximumLimitPerDay}
        listAddNew={listAddNew}
        getList={getList}
        amountValueDay={amountValueDay}
        amountValueTransaction={amountValueTransaction}
        formValues={formValues}
        debitAccNo={debitAccNo}
        listID={listID}
        debitAccountNo={debitAccountNo}
        debitAccountName={debitAccountName}
        creditAccountNo={creditAccountNo}
        creditAccountName={creditAccountName}
        triggerAuth={triggerAuth}
        navigation={navigation}
        state={state}
        debitAccName={debitAccName}
        productType={productType}
        balance={balance}
        payeeNumber={payeeNumber}
        payeeName={payeeName}
        payeeBank={payeeBank}
        payeeTargetAccNo={payeeTargetAccNo}
        payeeTargetAccName={payeeTargetAccName}
      
        errorNextTrx={errorNextTrx}
        errorNextDay={errorNextDay}
        errorFieldTrxLessthanDay={errorFieldTrxLessthanDay}
        limitPerDay={limitPerDay}
        limitPerTransaction={limitPerTransaction}
       
     
      />
    );
  }
}



const mapDispatchToProps = (dispatch) => ({
  inbankList: (creditAccountList) => {
    dispatch(inbankList(creditAccountList));
  }, 
  getSourceAcc: (payee, isTopup, isValas) => {
    dispatch(NavigationActions.navigate({
      routeName: 'TransferSourceAccount',
      params: {formName: 'fundTransfer', fieldName: 'myAccount', sourceType: 'fundTransfer', payee: payee, isTopup: isTopup, isValas: isValas}
    }));
  },     
  prefilledlimitPerDay: (limitPerDay) => {
    dispatch(change('autoFilledSetLimitConfirm', 'limitPerDay', limitPerDay));
  },  
  prefilledlimitPerTransaction: (limitPerTransaction) => {
    dispatch(change('autoFilledSetLimitConfirm', 'limitPerTransaction', limitPerTransaction));
  },
});

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(LimitTransactionEdit);
export default ConnectedFormPage;