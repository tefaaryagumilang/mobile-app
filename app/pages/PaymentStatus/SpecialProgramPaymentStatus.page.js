import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SpecialProgramPaymentStatus from '../../components/PaymentStatus/SpecialProgramPaymentStatus.component';
import {setDirtyMiniStatement, clearPaymentStatus, saveAutoSave} from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';
import {hidePaymentModal} from '../../state/actions/index.actions.js';
import {result} from 'lodash';
import {autoSaveFeedBackChecklist} from '../../state/thunks/onboarding.thunks';
import {storageKeys, set, get} from '../../utils/storage.util';

const mapStateToProps = (state) => ({
  data: result(state, 'paymentStatus', {}),
  autoSaveSaving: result(state, 'autoSave.isSaving', false),
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(hidePaymentModal());
    dispatch(clearPaymentStatus());
  },
  autoSaveCek: (isAutoSave, checked, type) => dispatch(autoSaveFeedBackChecklist(isAutoSave, checked, type)),
  saveAutoSaveFunc: (isAutoSave, checked) => dispatch(saveAutoSave(isAutoSave, checked)),
  getAutoSaveChecklist: () => get(storageKeys['AUTO_SAVE_CHECKLIST']),
});


class PaymentStatusPage extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    autoSaveCek: PropTypes.func,
    saveAutoSaveFunc: PropTypes.func,
    getAutoSaveChecklist: PropTypes.func,
    data: PropTypes.object,
    autoSaveSaving: PropTypes.bool,
  }

  state = {
    checked: false,
  }
  
  componentWillMount () {
    const {getAutoSaveChecklist} = this.props;
    set(storageKeys['AUTO_SAVE_CHECKLIST'], true);
    getAutoSaveChecklist().then((res) => {
      this.setState({
        checked: res,
      });
    });
  }

  render () {
    const {onClose, data, autoSaveCek, saveAutoSaveFunc, autoSaveSaving} = this.props;
    const {checked} = this.state;
    return (
      <SpecialProgramPaymentStatus resultData={data} onClose={onClose} autoSaveCek={autoSaveCek} 
        saveAutoSaveFunc={saveAutoSaveFunc} checked={checked} autoSaveSaving={autoSaveSaving}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);