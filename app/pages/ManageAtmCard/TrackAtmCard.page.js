import React from 'react';
import PropTypes from 'prop-types';
import TrackAtmCardComponent from '../../components/ManageAtmCard/TrackAtmCard.component';
import {connect} from 'react-redux';
import {result, sortBy, reverse} from 'lodash';
import {reduxForm} from 'redux-form';
import {checkActiveCard} from '../../state/thunks/dashboard.thunks';

const TrackAtmCardConfig = {
  form: 'TrackAtmCard',
  destroyOnUnmount: true,
  initialValues: {
  },
};

const TrackAtmCard = reduxForm(TrackAtmCardConfig)(TrackAtmCardComponent);

const mapStateToProps = (state) => ({
  accountsCust: result(state, 'accounts', []),
  currentLanguage: result(state, 'currentLanguage.id', ''),
});

const mapDispatchToProps = (dispatch) => ({
  goToActivateCard: () => dispatch(checkActiveCard()),
});

class TrackAtmCardClass extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToActivateCard: PropTypes.func,
  }

  componentDidMount = () => {
    
  }

  render () {
    const {navigation = {}, currentLanguage, goToActivateCard} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const listDataTrackAtm = result(navParams, 'dataStatusTrack', []);
    const dataArray = reverse(sortBy(listDataTrackAtm, 'dateTimeSubmitted'));

    return <TrackAtmCard
      navParams={navParams}
      currentLanguage={currentLanguage}
      dataArray={dataArray}
      goToActivateCard={goToActivateCard}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackAtmCardClass);
