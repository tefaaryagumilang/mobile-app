import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {getTransRefNumAndOTPNavigate, showFavoriteTransfer, removeFavorite, saveAlias, getSimasPoinLogin, triggerAuthNavigate, triggerAuthNavigateSetLimit} from '../../state/thunks/common.thunks';
import {transferSetLimit} from '../../state/thunks/fundTransfer.thunks';
import FundTransferConfirmation from '../../components/FundTransferJourney/FundTransferConfirmationSetLimit.component';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

const formConfig = {
  form: 'fundTransfer',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {doTransfer, triggerAuth, triggerAuthSetLimit, payee, formValues, shouldSendSmsOtp, isLogin}) => {
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const amountSetLimit = 500000000;
    const params = {onSubmit: doTransfer, amount: formValues.amount, isOtp: payee.isNewPayee};
    if (!isLogin) {
      if (shouldSendSmsOtp === false) {
        if (payee.isNewPayee === true) {
          dispatch(getSimasPoinLogin(params));
        } else {
          triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransfer', params, true);
        }
      } else {
        dispatch(getSimasPoinLogin(params));
      }
    } else if (Number(formValues.amount)  > amountSetLimit) {
      triggerAuthSetLimit(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthSetLimit', params, true);
    }   else {
      triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransfer', params, true);
    }
  }
};

const DecoratedFundTransferConfirmation = reduxForm(formConfig)(FundTransferConfirmation);

class FundTransferConfirmationPage extends Component {
  static propTypes = {
    accountList: PropTypes.array,
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    triggerAuthSetLimit: PropTypes.func,
    payee: PropTypes.object,
    transferSetLimit: PropTypes.func,
    resData: PropTypes.object,
    appConfig: PropTypes.object,
    gapTimeServer: PropTypes.number,
    favoriteBill: PropTypes.string,
    billerFavorite: PropTypes.array,
    showFavorite: PropTypes.func,
    removeFavorite: PropTypes.func,
    saveAlias: PropTypes.func,
    ownAccount: PropTypes.array,
    getFavBillerTrf: PropTypes.func,
    isFavorite: PropTypes.bool,
    timeConfig: PropTypes.object,
    tokenConfig: PropTypes.array,
    isLogin: PropTypes.bool,
  };

  doTransfer = () => {
    const {navigation, transferSetLimit} = this.props;
    const payee = result(navigation, 'state.params.payee.payeeAccount', {});    
    const myAccount = result(navigation, 'state.params.payee.myAccount', {});
    const isKyc = result(navigation, 'state.params.isKyc', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const resData = result(navigation, 'state.params.resData', {});
    setTimeout(() => transferSetLimit(formValues, payee, myAccount, resData, isKyc), 10);

  }

  render () {
    const {navigation, triggerAuth, appConfig, gapTimeServer, favoriteBill, billerFavorite, showFavorite, removeFavorite, ownAccount, saveAlias, timeConfig, isLogin, triggerAuthSetLimit} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const payeeAccount = result(navigation, 'state.params.payee.payeeAccount', {});    
    const myAccount = result(navigation, 'state.params.payee.myAccount', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const isOwnAccount = result(payee, 'payeeAccount.transferType', '') === 'own';
    const resData = result(navigation, 'state.params.resData', {});
    const targetAccountNumber = result(resData, 'transferTransaction.targetAccountNumber', '');
    const findFav = find(billerFavorite, (fav) => targetAccountNumber === fav.accountNumber);
    const isFavorite = !isEmpty(findFav);
    const shouldSendSmsOtp = result(navigation, 'state.params.shouldSendSmsOtp', false);
    return <DecoratedFundTransferConfirmation
      triggerAuth={triggerAuth} payee={payee} payeeAccount={payeeAccount} myAccount={myAccount} formValues={formValues}
      isOwnAccount={isOwnAccount} doTransfer={this.doTransfer} resData={resData}
      config={appConfig} gapTime={gapTimeServer} favoriteBill={favoriteBill}
      billerFavorite={billerFavorite} showFavorite={showFavorite} removeFavorite={removeFavorite}
      ownAccount={ownAccount} isFavorite={isFavorite} saveAlias={saveAlias} timeConfig={timeConfig} shouldSendSmsOtp={shouldSendSmsOtp} isLogin={isLogin}
      triggerAuthSetLimit={triggerAuthSetLimit}/>;
  }
}


const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => {
    if (isNewPayee) {
      return dispatch(getTransRefNumAndOTPNavigate('transfer', true, routeName, params, isOwnAccount));
    }
    return dispatch(triggerAuthNavigate('transfer', amount, isOwnAccount, routeName, params));
  },
  triggerAuthSetLimit: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => {
    if (isNewPayee) {
      return dispatch(getTransRefNumAndOTPNavigate('transfer', true, routeName, params, isOwnAccount));
    }
    return dispatch(triggerAuthNavigateSetLimit('transfer', amount, isOwnAccount, routeName, params));
  },
  transferSetLimit: (values, payee, myAccount, resData, isKyc) => dispatch(transferSetLimit(values, payee, myAccount, 'fundTransfer', resData, false, '', isKyc)),
  showFavorite: (billerName, subsNumber) => () => dispatch(showFavoriteTransfer(billerName, subsNumber)),
  removeFavorite: (billerName, subsNumber) => () => dispatch(removeFavorite(billerName, subsNumber)),
  saveAlias: () => dispatch(saveAlias())
});

const mapStateToProps = (state) => ({
  appConfig: result(state, 'config', {}),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  favoriteBill: result(state, 'billerDescFav.isFavorite', ''),
  billerFavorite: result(state, 'billerFavorite', {}),
  ownAccount: result(state, 'accounts', {}),
  timeConfig: result(state, 'timeConfig', {}),
  tokenConfig: result(state, 'config.tokenConfig', []),
  isLogin: !isEmpty(result(state, 'user', {})),
});

const connectedFundTransferConfirmation = connect(mapStateToProps, mapDispatchToProps)(FundTransferConfirmationPage);
export default connectedFundTransferConfirmation;
