import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {result} from 'lodash';
import AddNewAtmSuccessScreen from '../../components/ManageAtmCard/AddNewAtmSuccessScreen.component';
import {trackAtmCardFromSuccessScreenLinking} from '../../state/thunks/dashboard.thunks';

const formConfig = {
  form: 'AddNewAtmSuccessScreen',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(NavigationActions.back()),
};

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
});

const mapDispatchToProps = (dispatch) => ({
  goToTrackAtmCard: () => dispatch(trackAtmCardFromSuccessScreenLinking()),
});

const AddNewAtmSuccessScreenForm = reduxForm(formConfig)(AddNewAtmSuccessScreen);

class AddNewAtmSuccessScreenPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToTrackAtmCard: PropTypes.func,
  };

  render () {
    const {navigation, currentLanguage, goToTrackAtmCard} = this.props;
    return <AddNewAtmSuccessScreenForm navigation={navigation} currentLanguage={currentLanguage} goToTrackAtmCard={goToTrackAtmCard}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAtmSuccessScreenPage);
