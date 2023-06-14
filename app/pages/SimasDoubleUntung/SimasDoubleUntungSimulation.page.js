import React from 'react';
import PropTypes from 'prop-types';
import SimasDoubleUntungSimulationComponent, {fields} from '../../components/SimasDoubleUntung/SimasDoubleUntungSimulation.component';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {reduxForm, change} from 'redux-form';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {validateRequiredFields, validateEmail, validateMinimumAmountInput, isModulus} from '../../utils/validator.util';
import {getDataAccountList} from '../../utils/middleware.util';
import {getSduCashback} from '../../state/thunks/savingAccount.thunks';
import moment from 'moment';

const multiplicationValue = 1000000; // variable for validation

const simasDoubleUntungConfig = {
  form: 'SimasDoubleUntungSimulation',
  destroyOnUnmount: true,
  validate: (values, props) => {
    const selectedAccount = result(values, 'sourceAccount', {});
    const availableBalance = result(selectedAccount, 'balances.availableBalance', '');
    const amount = result(values, 'amount', '');
    const email = result(values, 'email', '');
    const initialDeposit = parseInt(result(props, 'initialDeposit', '0'));
    const errors = {
      ...validateRequiredFields(values, [fields.AMOUNT, fields.SOURCE_ACCOUNT, fields.PERIOD, fields.EMAIL]),
    };
    return {
      ...errors,
      amount: validateMinimumAmountInput(amount, initialDeposit, availableBalance, 'Rp') || isModulus(amount, multiplicationValue),
      email: validateEmail(email),
    };
  },
  onSubmit: (values, dispatch, props) => {
    const selectedAccount = result(values, 'sourceAccount', {});
    const amount = result(values, 'amount', '');
    const email = result(values, 'email', '');
    const period = result(values, 'period', {});
    const periodValue = result(period, 'value', '');
    const startDate = moment().format('DD MMM YYYY');
    const maturityDate = moment(startDate).add(periodValue, 'M').format('DD MMM YYYY');
    const cashbackPercent = result(props, 'cashbackPercent', '');
    const cashbackAmount = result(props, 'cashbackAmount', '');
    const params = {selectedAccount, amount, email, period, periodValue, startDate, maturityDate, cashbackPercent, cashbackAmount};
    dispatch(NavigationActions.navigate({routeName: 'SimasDoubleUntungConfirmation', params}));
  }
};

const mapStateToProps = (state) => ({
  initialDeposit: result(state, 'productData.productDeposit', ''),
  formValues: result(state, 'form.SimasDoubleUntungSimulation.values', {}),
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
  email: result(state, 'user.profile.email', ''),
});

const mapDispatchToProps = (dispatch) => ({
  getCashback: () => dispatch(getSduCashback()),
  prefillEmail: (email) => dispatch(change('SimasDoubleUntungSimulation', 'email', email)),
});

const SimasDoubleUntungSimulation = reduxForm(simasDoubleUntungConfig)(SimasDoubleUntungSimulationComponent);

class SimasDoubleUntungSimulationClass extends React.Component {

  static propTypes = {
    getSourceAcc: PropTypes.func,
    showAlert: PropTypes.func,
    savingProductType: PropTypes.string,
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    getCashback: PropTypes.func,
    email: PropTypes.string,
    prefillEmail: PropTypes.func,
    initialDeposit: PropTypes.string,
  }

  state = {
    cashbackPercent: '-',
    cashbackAmount: '',
  }

  filterAccount = (account) => {
    const {productType = '', accountStatus = ''} = account;
    if (productType.toUpperCase() === 'TABUNGAN SIMAS GOLD' && accountStatus === 'active') {
      return account;
    }
  }
  
  calculateCashback = () => {
    const {getCashback} = this.props;
    getCashback().then((res) => {
      if (res) {
        const percent = result(res, 'cashback', '');
        const amount = result(res, 'present', '').toString();
        this.setState({cashbackAmount: amount, cashbackPercent: percent});
      } else {
        this.resetCashback();
      }
    });
  }

  resetCashback = () => {
    this.setState({cashbackAmount: '', cashbackPercent: ''});
  }

  componentDidMount () {
    const {email, prefillEmail} = this.props;
    prefillEmail(email);
  }

  validateAmount = (accountBalance, amountInputted) => {
    const {initialDeposit} = this.props;
    const initialDepositInt = parseInt(initialDeposit);
    if (!isEmpty(accountBalance.toString())) {
      return amountInputted <= accountBalance && amountInputted >= initialDepositInt && amountInputted % multiplicationValue === 0;
    } else {
      return amountInputted >= initialDepositInt && amountInputted % multiplicationValue === 0;
    }
  }

  componentDidUpdate (prevProps) {
    const prevPeriod = result(prevProps, 'formValues.period.value', '');
    const currentPeriod = result(this.props, 'formValues.period.value', '');
    const accountProductType = result(this.props, 'formValues.sourceAccount.productType', '');
    const accountBalance = result(this.props, 'formValues.sourceAccount.balances.availableBalance', '');
    const productTypeGold = accountProductType.toUpperCase().includes('GOLD');
    const periodIsSelected = !isEmpty(result(this.props, 'formValues.period', ''));
    const amountInputted = !isEmpty(result(this.props, 'formValues.amount', '')) && result(this.props, 'formValues.amount', '');
    const amountValid = this.validateAmount(accountBalance, amountInputted);
    const prevAccountNum = result(prevProps, 'formValues.sourceAccount.accountNumber', '');
    const currentAccountNum = result(this.props, 'formValues.sourceAccount.accountNumber', '');
    const calculateReward = productTypeGold && periodIsSelected && amountInputted && amountValid;
    if (calculateReward && ((!isEmpty(currentPeriod) && prevPeriod !== currentPeriod) || (prevAccountNum !== currentAccountNum))) {
      this.calculateCashback();
    }
  }

  render () {
    const {formValues, navigation, accounts, initialDeposit} = this.props;
    const cashbackPercent = result(this.state, 'cashbackPercent', '-');
    const cashbackAmount = result(this.state, 'cashbackAmount', '').toString();
    const periodList = result(navigation, 'state.params.periodList', {});
    const filteredAccounts = accounts.filter(this.filterAccount);
    const displayAccounts = getDataAccountList(filteredAccounts);
    const emptyPeriod = isEmpty(result(formValues, 'period', {}));
    const emptySourceAccount = isEmpty(result(formValues, 'sourceAccount', {}));
    const disabled = emptyPeriod || emptySourceAccount;

    return <SimasDoubleUntungSimulation formValues={formValues} periodList={periodList} disabled={disabled} getCashback={this.calculateCashback}
      navigation={navigation} cashbackPercent={cashbackPercent} cashbackAmount={cashbackAmount} displayAccounts={displayAccounts}
      resetCashback={this.resetCashback} initialDeposit={initialDeposit} validateAmount={this.validateAmount}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SimasDoubleUntungSimulationClass);
