import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileHeader.styles';
import {View} from 'react-native';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {openInbox, openTrfBiller} from '../../state/thunks/dashboard.thunks';
import result from 'lodash/result';
import {goToOnlineMainAll} from '../../state/thunks/generateCode.thunks';

class PayHeader extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    goToCart: PropTypes.func,
    goToMyVoucher: PropTypes.func,
    egiftCart: PropTypes.array,
    simasPoin: PropTypes.object,
    navigation: PropTypes.object,
    openInbox: PropTypes.func,
    inboxCounter: PropTypes.array,
    generateCodeOnboard: PropTypes.object,
    config: PropTypes.object,
    openFav: PropTypes.func,
    user: PropTypes.object,
  }

  callInbox = () => {
    const {dispatch} = this.props;
    dispatch(openInbox());
  }

  callFavorite = () => {
    const {dispatch} = this.props;
    dispatch(openTrfBiller());
  }

  goToOnlineMainAll = () => {
    const {dispatch} = this.props;
    dispatch(goToOnlineMainAll('x'));
  }

  render () {
    const {generateCodeOnboard = {}, config = {}} = this.props;
    const flagLKDPurchase = String(result(config, 'flag.flagLKDPurchase', 'INACTIVE')).toUpperCase() === 'ACTIVE';
    const flagLKDCashOut = String(result(config, 'flag.flagLKDCashOut', 'INACTIVE')).toUpperCase() === 'ACTIVE';
    const accOffline = result(generateCodeOnboard, 'data.accountOffline', []).length > 0;
    const showQrLdkGenerator = false && (accOffline) && (flagLKDPurchase || flagLKDCashOut);
    return (
      <View style={styles.container}>
        {showQrLdkGenerator  ?
          <Touchable onPress={this.goToOnlineMainAll} style={styles.iconQr}>
            <SimasIcon name={'pay-by-qr'} size={32} style={styles.burger}/>
          </Touchable>
          :
          null
        }
      </View>
    );
  }
}

export default PayHeader;
