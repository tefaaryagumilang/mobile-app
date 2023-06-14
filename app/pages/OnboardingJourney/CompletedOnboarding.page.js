import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CompletedOnboardingView from '../../components/OnboardingJourney/CompletedOnboarding.component';
import {connect} from 'react-redux';
import {prepareGoDashboard} from '../../state/thunks/onboarding.thunks';
import result from 'lodash/result';

const mapStateToProps = ({currentLanguage}) => ({currentLanguage});
const mapDispatchToProps = (dispatch) => ({
  goDashboard: () => {
    dispatch(prepareGoDashboard());
  }
});

class CompletedOnboarding extends Component {
  static propTypes = {
    goDashboard: PropTypes.func,
    navigation: PropTypes.object
  }
  onPress = () => {
    this.props.goDashboard();
  }
  render () {

    const dynatrace = result(this.props.navigation, 'state.params.dynatrace', '');
    return (
      <CompletedOnboardingView onPress={this.onPress} dynatrace={dynatrace}/>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedOnboarding);
