import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PushNotifInbox from '../../components/Home/PushNotifInbox.component';
import {getInboxTrx, getInboxPromo} from '../../state/thunks/dashboard.thunks';
import {tokenPaymentDeeplink} from '../../state/thunks/common.thunks';
import sortBy from 'lodash/sortBy';
import {gotoYouOweDetailDeepLink, gotoYouBillDetailDeeplink, gotoNKYCDeeplink} from '../../state/thunks/splitBill.thunks'; 

const mapDispatchToProps = (dispatch) => ({
  getInbox: (nextData) => dispatch(getInboxTrx(nextData)),
  getInboxPromo: (nextData) => dispatch(getInboxPromo(nextData)),
  tokenPayment: (token) => dispatch(tokenPaymentDeeplink(token)),
  tokenPaymentSplitBill: (token, activation,  isInbox = true) => {
    dispatch(gotoYouOweDetailDeepLink(token, activation, isInbox));
  },
  tokenPaymentNKYC: (token, activation) => {
    dispatch(gotoNKYCDeeplink(token, activation));
  },
  tokenPaymentSplitBillUser: (token, activation, isInbox = true) => {
    dispatch(gotoYouBillDetailDeeplink(token, activation, isInbox));
  },
});

const mapStateToProps = (state) => ({
  pushNotifList: result(state, 'pushNotif', []),
  pushNotifListPromo: result(state, 'pushNotifPromo', []),
  currentState: state
});

class PushNotifInboxPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    getInbox: PropTypes.func,
    getInboxPromo: PropTypes.func,
    pushNotifList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    paramsData: PropTypes.array,
    goToPushBilling: PropTypes.func,
    tokenPayment: PropTypes.func,
    tokenPaymentNKYC: PropTypes.func,
    tokenPaymentSplitBill: PropTypes.func,
    tokenPaymentSplitBillUser: PropTypes.func,
    pushNotifListPromo: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  componentDidMount () {
    const {getInbox, getInboxPromo, navigation} = this.props;
    const nextPage = null;
    const pushNotifList = null;
    const paramsDataTrx = result(navigation, 'state.params.sortInboxTrx', []);
    const paramsDataPromo = result(navigation, 'state.params.sortInboxPromo', []);
    getInbox({nextPage, paramsDataTrx, pushNotifList});
    getInboxPromo({nextPage, paramsDataPromo, pushNotifList});

  }
    
  goToPushBilling = (token, isPushSplitBillNKYC, isPushSplitBill, isPushSplitBillUser, activation) => () => {
    if (isPushSplitBillNKYC) {
      this.props.tokenPaymentNKYC(token, activation);
    } else if (isPushSplitBill) {
      this.props.tokenPaymentSplitBill(token, activation);
    } else if (isPushSplitBillUser) {
      this.props.tokenPaymentSplitBillUser(token, activation);
    } else {
      this.props.tokenPayment(token);
    }
  }

  render () {
    const {navigation, pushNotifList, pushNotifListPromo, getInbox, getInboxPromo} = this.props;
    const paramsDataTrx = result(navigation, 'state.params.sortInboxTrx', []);
    const paramsDataPromo = result(navigation, 'state.params.sortInboxPromo', []);
    const dataTrx = result(pushNotifList, 'data', []);
    const dataPromo = result(pushNotifListPromo, 'data', []);
    const sortingDataTrx = sortBy(dataTrx, ['test_status']);
    const sortingDataPromo = sortBy(dataPromo, ['test_status']);
    const nextPage = result(pushNotifList, 'next_page');
    const nextPagePromo = result(pushNotifListPromo, 'next_page');
    const total = result(pushNotifList, 'total');
    const totalPromo = result(pushNotifListPromo, 'total');
    return <PushNotifInbox navigation={navigation} dataTrx={dataTrx} dataPromo={dataPromo} nextPage={nextPage} sortingDataTrx={sortingDataTrx} sortingDataPromo={sortingDataPromo} totalPromo={totalPromo} nextPagePromo={nextPagePromo}
      getInbox={getInbox} getInboxPromo={getInboxPromo} pushNotifList={pushNotifList} pushNotifListPromo={pushNotifListPromo} total={total} paramsDataTrx={paramsDataTrx} paramsDataPromo={paramsDataPromo} goToPushBilling={this.goToPushBilling}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PushNotifInboxPage);
