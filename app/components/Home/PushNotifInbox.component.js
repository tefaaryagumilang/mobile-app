import {View, FlatList, Image, Text, Linking} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './PushNotifInbox.style';
import {listViewComparator} from '../../utils/transformer.util';
import externalLink from '../../assets/images/link_external.png';
import defaultTrx from '../../assets/images/trxIcon_inbox.png';
import moment from 'moment';
import {result, isEmpty} from 'lodash';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import Touchable from '../../components/Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';

class PushNotifInbox extends React.Component {
  static propTypes = {
    navigation: PropTypes.array,
    dataTrx: PropTypes.array,
    dataPromo: PropTypes.array,
    sortingDataTrx: PropTypes.array,
    sortingDataPromo: PropTypes.array,
    nextPage: PropTypes.number,
    nextPagePromo: PropTypes.number,
    total: PropTypes.number,
    totalPromo: PropTypes.number,
    getInbox: PropTypes.func,
    paramsDataTrx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    paramsDataPromo: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    pushNotifList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    pushNotifListPromo: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    goToPushBilling: PropTypes.func,
    getInboxPromo: PropTypes.func,
  }
  comparator = listViewComparator

  state = {
    onTrx: true,
    onPromo: false,
  }

  trxPressed = () => {
    this.setState({onTrx: true});
    this.setState({onPromo: false});
  }

  promoPressed = () => {
    this.setState({onTrx: false});
    this.setState({onPromo: true});
  }

  getList = () => {
    const {dataTrx, nextPage, getInbox, paramsDataTrx, total, pushNotifList} = this.props;
    if (dataTrx.length !== total) {
      getInbox({nextPage, paramsDataTrx, pushNotifList});
    }
  }

  getListPromo = () => {
    const {dataPromo, nextPagePromo, getInboxPromo, paramsDataPromo, totalPromo, pushNotifListPromo} = this.props;
    if (dataPromo.length !== totalPromo) {
      getInboxPromo({nextPage: nextPagePromo, paramsDataPromo, pushNotifList: pushNotifListPromo});
    }
  }

  openLink = (termsLink) => () => {
    if (isEmpty(termsLink)) {
      return;
    } else {
      Linking.canOpenURL(termsLink).then((supported) => {
        if (supported) {
          Linking.openURL(termsLink);
        } else {
          Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
        }
      });
    }
  };

  renderListItem = ({item}) => {
    const {goToPushBilling} = this.props;
    const endDate = '000';
    const image = result(item, 'image', '');
    const text = result(item, 'text', '');
    const sendDate = result(item, 'send_date', '').concat(endDate);
    const actionParams = result(item, 'action_params', '');
    const parseActionParams = JSON.parse(actionParams);
    const url = result(parseActionParams, 'l', '');
    let indexOfToken;
    let token;
    let isPushBilling;
    let activation;
    const isPushSplitBillNKYC = url.search('splitBill-NKYC') === 50;
    const isPushSplitBill = url.search('splitBill') === 50;
    const isPushSplitBillPAY = url.search('fundTransfer-SplitBill') === 50;
    const isPushRejectSplitBill = url.search('rejectSplitBill') === 50;
    const isPushRejectSplitBillNKYC = url.search('rejectSplitBill-NKYC') === 50;
    if (isPushSplitBillNKYC) {
      indexOfToken = url.indexOf('splitBill-NKYC');
      token = url.substring(indexOfToken + 15, url.length);
      isPushBilling = url.search('splitBill-NKYC') === 50;
      activation = 'splitBill-NKYC';
    } else if (isPushSplitBill) {
      indexOfToken = url.indexOf('splitBill');
      token = url.substring(indexOfToken + 10, url.length);
      isPushBilling = url.search('splitBill') === 50;
      activation = 'splitBill';
    } else if (isPushSplitBillPAY) {
      indexOfToken = url.indexOf('fundTransfer-SplitBill');
      token = url.substring(indexOfToken + 23, url.length);
      isPushBilling = url.search('fundTransfer-SplitBill') === 50;
      activation = 'fundTransfer-SplitBill';
    } else if (isPushRejectSplitBill && !isPushRejectSplitBillNKYC) {
      indexOfToken = url.indexOf('rejectSplitBill');
      token = url.substring(indexOfToken + 16, url.length);
      isPushBilling = url.search('rejectSplitBill') === 50;
      activation = 'rejectSplitBill';
    } else if (isPushRejectSplitBillNKYC && isPushRejectSplitBill) {
      indexOfToken = url.indexOf('rejectSplitBill-NKYC');
      token = url.substring(indexOfToken + 21, url.length);
      isPushBilling = url.search('rejectSplitBill-NKYC') === 50;
      activation = 'rejectSplitBill-NKYC';
    } else {
      indexOfToken = url.indexOf('Tokenpayment');
      token = url.substring(indexOfToken + 13, url.length);
      isPushBilling = url.search('Tokenpayment') === 45;
    }
    const date2 = parseInt(sendDate);
    const newDate = new Date(date2);
    const date = moment(newDate).format('MMM D');
    const isPushSplitBillUser = isPushSplitBillPAY || isPushRejectSplitBill || isPushRejectSplitBillNKYC;
    return (
      <View style={styles.bgWhite}>
        <Touchable onPress={ isPushBilling ? goToPushBilling(token, isPushSplitBillNKYC, isPushSplitBill, isPushSplitBillUser, activation) : this.openLink(url)}>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Image source={ isPushBilling ? {uri: image} : isEmpty(image) || image === '' ? defaultTrx : {uri: image} }  style={styles.imageOffer2} />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.pad2}>
                <Text style={styles.typeTxt}>{text}</Text>
              </View>
            </View>
            <View style={styles.date}>
              <Text style={styles.dateText}>{date}</Text>
            </View>
            <View style={styles.arrowContainer}>
              <Image source={isEmpty(url) ? null : externalLink } size={15} style={styles.arrowIcon}/>
            </View>
          </View>
          <View style={styles.greyLine} />
        </Touchable>
      </View>
    );
  }


  render () {
    const {sortingDataTrx, sortingDataPromo} = this.props;
    const {onTrx, onPromo} = this.state;
    return (
      <View style={styles.contentContainerStyle}>
        <View style={styles.buttonTopContainer}>
          <Touchable onPress={this.trxPressed}>
            <View style={onPromo ? styles.buttoTopBillActivePromo : styles.buttoTopBillActive}>
              <Text style={styles.topButtonTextActive}>Transaction</Text>
              {onTrx && <View style={styles.underLine}/>}
            </View>
          </Touchable>

          <Touchable onPress={this.promoPressed}>
            <View style={onTrx ? styles.buttoTopBillActivePromo : styles.buttoTopBillActive}>
              <Text style={styles.topButtonTextActive}>Info/Promo</Text>
              {onPromo && <View style={styles.underLine}/>}
            </View>
          </Touchable>
        </View>
        <View style={styles.infoBox}>
          <SimasIcon name='alert-circle' size={20} style={styles.warningIcon}/>
          <Text style={styles.iTextDetail}>{language.INBOX_NOTIFICATION_DAYS}</Text>
        </View>
        <FlatList
          data={onTrx ? sortingDataTrx : sortingDataPromo}
          renderItem={this.renderListItem} 
          onEndReached={onTrx ? this.getList : this.getListPromo}
          onEndReachedThreshold={0.01}/>
      </View>
    );
  }
}

export default PushNotifInbox;
