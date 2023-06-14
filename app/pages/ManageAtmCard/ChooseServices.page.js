import React from 'react';
import PropTypes from 'prop-types';
import ChooseServicesComponent from '../../components/ManageAtmCard/ChooseServices.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {checkActiveCard, checkBlockCard, addNewAtmCard, getClosingConfig, trackAtmCard} from '../../state/thunks/dashboard.thunks';

const mapStateToProps = (state) => {
  const simasPoinHistory = result(state, 'simasPoinHistory', []);
  const toogleCloseAccount = result(state, 'toogleCloseAcc', true);
  return {
    simasPoinHistory,
    toogleCloseAccount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  goToActivateCard: () => dispatch(checkActiveCard()),
  goToBlockCard: () => dispatch(checkBlockCard()),
  goToAddNewAtmCard: () => dispatch(addNewAtmCard()),
  goToCloseCard: () => dispatch((getClosingConfig())),
  goToTrackAtmCard: () => dispatch(trackAtmCard()),
});

class ChooseServices extends React.Component {

  static propTypes = {
    simasPoinHistory: PropTypes.object,
    navigation: PropTypes.object,
    goToActivateCard: PropTypes.func,
    goToBlockCard: PropTypes.func,
    goToAddNewAtmCard: PropTypes.func,
    goToCloseCard: PropTypes.func,
    toogleCloseAccount: PropTypes.bool,
    goToTrackAtmCard: PropTypes.func,
  }
  render () {
    const {navigation, goToActivateCard, goToBlockCard, goToAddNewAtmCard, goToCloseCard, toogleCloseAccount, goToTrackAtmCard} = this.props;
    const data = result(navigation, 'state.params', {});
    return <ChooseServicesComponent navigation={navigation} data={data} goToActivateCard={goToActivateCard} goToBlockCard={goToBlockCard} goToAddNewAtmCard={goToAddNewAtmCard}
      goToCloseCard={goToCloseCard} toogleCloseAccount={toogleCloseAccount} goToTrackAtmCard={goToTrackAtmCard}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChooseServices);
