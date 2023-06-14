import React from 'react';
import PropTypes from 'prop-types';
import SimasDoubleUntungConfirmationComponent from '../../components/SimasDoubleUntung/SimasDoubleUntungConfirmation.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {createSduAccount} from '../../state/thunks/savingAccount.thunks';

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
  confirm: (params) => {
    dispatch(createSduAccount(params));
  },
});

class SimasDoubleUntungConfirmationClass extends React.Component {

  static propTypes = {
    getSourceAcc: PropTypes.func,
    showAlert: PropTypes.func,
    savingProductType: PropTypes.string,
    formValues: PropTypes.object,
    periodList: PropTypes.array,
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    getConfirmation: PropTypes.func,
    getAmount: PropTypes.func,
    confirm: PropTypes.func,
  }

  onSubmit = () => {
    const {navigation, confirm} = this.props;
    const sourceAccount = result(navigation, 'state.params.selectedAccount', {});
    const amount = result(navigation, 'state.params.amount', '');
    const email = result(navigation, 'state.params.email', '');
    const period = result(navigation, 'state.params.period', {});
    const startDate = result(navigation, 'state.params.startDate', '');
    const maturityDate = result(navigation, 'state.params.maturityDate', '');
    const cashbackPercent = result(navigation, 'state.params.cashbackPercent', '');
    const cashbackAmount = result(navigation, 'state.params.cashbackAmount', '');
    const params = {sourceAccount, amount, email, period, startDate, maturityDate, cashbackPercent, cashbackAmount};
    confirm(params);
  }

  render () {
    const {navigation} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount', {});
    const amount = result(navigation, 'state.params.amount', '');
    const email = result(navigation, 'state.params.email', '');
    const period = result(navigation, 'state.params.period', {});
    const periodValue = result(navigation, 'state.params.periodValue', '');
    const startDate = result(navigation, 'state.params.startDate', '');
    const maturityDate = result(navigation, 'state.params.maturityDate', '');
    const cashbackPercent = result(navigation, 'state.params.cashbackPercent', '');
    const cashbackAmount = result(navigation, 'state.params.cashbackAmount', '');

    return <SimasDoubleUntungConfirmationComponent navigation={navigation} selectedAccount={selectedAccount} amount={amount} email={email} 
      period={period} periodValue={periodValue} startDate={startDate} maturityDate={maturityDate} cashbackPercent={cashbackPercent}
      cashbackAmount={cashbackAmount} onSubmit={this.onSubmit}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimasDoubleUntungConfirmationClass);