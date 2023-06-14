import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BillerTypeEightIndex from '../../components/BillerTypeEightJourney/BillerTypeEightIndex.component';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import {getAmountForGenericBillerTypeEight} from '../../state/thunks/genericBill.thunks';
import {
  validateRequiredFields,
  validateSubscriberNo,
} from '../../utils/validator.util';
import {result, filter, clone} from 'lodash';
import {
  deleteBillpayHistory,
  getBillpayHistory,
} from '../../state/thunks/common.thunks';
// let Analytics = firebase.analytics();

// import {Platform} from 'react-native';

const mapStateToProps = (state) => ({
  billpayHistory: result(state, 'billpayHistory', {}),
  billerConfig: result(state, 'billerConfig', {})
});

const mapDispatchToProps = (dispatch) => ({
  deleteBillpayHistory: (history) => () =>
    dispatch(deleteBillpayHistory(history)),
  selectHistory: (subscriberNo) => {
    dispatch(change('BillerTypeEightIndexForm', 'subscriberNo', subscriberNo));
  },
  getBillpayHistory: () => dispatch(getBillpayHistory())
});

const formConfig = {
  form: 'BillerTypeEightIndexForm',
  validate: (values, {navigation}) => {
    const biller = result(navigation, 'state.params.biller', {});
    const subscriberNoValidation = result(biller, 'validation', '');
    const subscriberNoText =
      result(biller, 'billerPreferences.paymentSubscriberNoKey', '') ||
      result(biller, 'billerPreferences.purchaseSubscriberNoKey', '');
    const errors = {
      subscriberNo: validateSubscriberNo(
        values.subscriberNo,
        subscriberNoValidation,
        subscriberNoText
      ),
      ...validateRequiredFields(values, ['subscriberNo']),
    };
    return errors;
  },
  onSubmit: (values, dispatch, {navigation}) => {
    const biller = result(navigation, 'state.params.biller', {});
    const favBiller = result(navigation, 'state.params.favBill', {});
    // const code = result(biller, 'billerPreferences.code', '');
    // const billCode = code.concat('-1');
    // const os = Platform.OS;
    // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
    dispatch(
      getAmountForGenericBillerTypeEight(values.subscriberNo, biller, favBiller)
    );
  },
};

const BillerTypeEightIndexForm = reduxForm(formConfig)(BillerTypeEightIndex);

class BillerTypeEightIndexPage extends Component {
  static propTypes = {
    billers: PropTypes.array,
    updateRecentTransactions: PropTypes.func,
    navigation: PropTypes.object,
    deleteBillpayHistory: PropTypes.func,
    selectHistory: PropTypes.func,
    billerConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    billpayHistory: PropTypes.object
  };

  state = {
    isUsingPhoneNumber: false,
  };

  componentWillMount () {
    const {navigation = {}} = this.props;
    const biller = result(navigation, 'state.params.biller', {});
    const isUsingPhoneNumber = result(
      biller,
      'billerPreferences.isUsingPhoneNumber',
      false
    );
    this.setState({isUsingPhoneNumber});
  }
  render () {
    const {
      deleteBillpayHistory,
      billerConfig,
      selectHistory,
      billpayHistory,
      navigation,
      ...extraProps
    } = this.props;
    const billerList = result(billerConfig, 'billerList', []);
    const biller = result(navigation, 'state.params.biller', {});
    const savedBillPaymentList = result(
      billpayHistory,
      'savedBillPaymentList',
      []
    );
    let history = clone(billpayHistory);
    const newBillPaymentList = filter(
      savedBillPaymentList,
      (historyItem) => historyItem.billerId === biller.id
    );
    history.savedBillPaymentList = newBillPaymentList;
    return (
      <BillerTypeEightIndexForm
        isUsingPhoneNumber={this.state.isUsingPhoneNumber}
        deleteBillpayHistory={deleteBillpayHistory}
        selectHistory={selectHistory}
        billerList={billerList}
        reloadHistory={getBillpayHistory}
        billpayHistory={history}
        navigation={navigation}
        {...extraProps}
      />
    );
  }
}

const ConnectedBillerTypeEightIndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BillerTypeEightIndexPage);
export default ConnectedBillerTypeEightIndexPage;
