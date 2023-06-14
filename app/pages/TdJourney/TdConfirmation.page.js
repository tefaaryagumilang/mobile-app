import React from 'react';
import PropTypes from 'prop-types';
import TdConfirmation from '../../components/TdJourney/TdConfirmation.component';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import result from 'lodash/result';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {createTd} from '../../state/thunks/dashboard.thunks';

const formConfig = {
  form: 'tdConfirmationForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation, triggerAuth, openTd}) => {
    const {tdSummary, dynatrace} = navigation.state.params;
    const params = {onSubmit: openTd, amount: tdSummary.initialDeposit, isOtp: false, dynatrace};
    triggerAuth(tdSummary.initialDeposit, params);
  }
};

const mapStateToProps = (state) => {
  const accountNo = result(state, 'form.TdForm.values.accountNo', {});
  const tenorRate = result(state, 'tdConfig.conventionalConfig.tenorRate', {});
  const maturityType = result(state, 'form.TdForm.values.maturityType.label', '');
  return {
    accountNo, maturityType, tenorRate,
    transRefNum: state.transRefNum,
    config: result(state, 'config.tokenConfig', []),
    userId: result(state, 'user.profile.customer.id', 0),
    userMobileNumber: result(state, 'user.profile.mobileNumberMasking', '')
  };
};

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('td', amount, true, 'AuthTd', params)),
  createTd: (issharia, accountNo, dynatrace) => dispatch(createTd(issharia, accountNo, dynatrace))
});


class TdConfirmationScreen extends React.Component {
  static propTypes = {
    accountNo: PropTypes.object,
    navigation: PropTypes.object,
    createTd: PropTypes.func,
    tenorRate: PropTypes.object,
  };
  openTd = () => {
    const {accountNo, navigation, createTd} = this.props;
    const isSharia = result(navigation, 'state.params.isShariaAccount', false);
    const dynatrace = result(navigation, 'state.params.dynatrace', false);
    createTd(isSharia, accountNo, dynatrace);
  }
  render () {
    return <ContainerForm {...this.props} openTd={this.openTd}/>;
  }
}

const ContainerForm = reduxForm(formConfig)(TdConfirmation);

export default connect(mapStateToProps, mapDispatchToProps)(TdConfirmationScreen);
