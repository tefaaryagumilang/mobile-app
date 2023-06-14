import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image, Linking, Platform} from 'react-native';
import styles from './SpecialProgramPaymentStatus.styles';
import {Toast} from '../../utils/RNHelpers.util';
import SimobiPlus from '../../assets/images/simobiplus.png';
import shareIcon from '../../assets/images/SHARE.png';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import ViewShot from 'react-native-view-shot';
import {result, isEmpty, noop} from 'lodash';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import Touchable from '../Touchable.component';
import CheckBox from 'react-native-checkbox';
import CheckBoxSelected from '../../assets/images/checkbox-selected.png';
import CheckBoxUnselected from '../../assets/images/checkbox-unselected.png';
import moment from 'moment';
import {currencyFormatter} from '../../utils/transformer.util';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

class PaymentStatus extends React.Component {

  static propTypes = {
    onClose: PropTypes.func,
    autoSaveCek: PropTypes.func,
    saveAutoSaveFunc: PropTypes.func,
    resultData: PropTypes.object,
    voucherValidity: PropTypes.bool,
    autoSaveSaving: PropTypes.bool,
    cashbackAmount: PropTypes.string,
  }

  state = {
    height: 0,
    width: 0,
    checked: this.props.autoSaveSaving,
  }

  getScreenSize = (event) => {
    const {height, width} = event.nativeEvent.layout;
    this.setState({height, width});
  }

  openStoreURL = () => {
    Linking.canOpenURL('http://.bit.ly/simobiplus').then((supported) => {
      if (supported) {
        Linking.openURL('http://bit.ly/simobiplus');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  call = () => {
    Linking.canOpenURL('tel:1500153').then((supported) => {
      if (supported) {
        Linking.openURL('tel:1500153');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  capturePayment = () => {
    this.refs.viewShot.capture().then((uri) => {
      const options = {
        title: language.PAYMENT_STATUS__SHARE_WITH,
        url: Platform.OS === 'ios' ? 'file://' + uri : 'data:image/png;base64,' + uri
      };
      Share.open(options);
    });
  }

  screenCapture = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((response) => {
        if (!response) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((res) => { 
            if (res !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__PERMISSION_PHOTOS);
            } else {
              this.capturePayment();
            }
          });
        } else {
          this.capturePayment();
        }
      });
    } else {
      Permissions.check('ios.permission.PHOTO_LIBRARY').then((response) => {
        if (response !== 'granted') {
          Permissions.request('ios.permission.PHOTO_LIBRARY').then((response) => {
            if (response !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePayment();
            }
          });
        } else {
          this.capturePayment();
        }
      });
    }
  }

  toogleCheckbox = () => {
    const {autoSaveCek, saveAutoSaveFunc, resultData} = this.props;
    const isSaving = result(resultData, 'isSaving', 'SDU');
    const type = {isSaving};

    const checked = !this.state.checked;
    this.setState({checked: checked});
    const isAutoSave = checked;

    saveAutoSaveFunc({isAutoSave: isAutoSave, checked: checked});
    autoSaveCek(isAutoSave, checked, type);
    checked ? this.goToGalery() : null;

    const message = this.state.checked ? language.AUTO_SAVE_TOAST_FALSE : language.AUTO_SAVE_TOAST_TRUE;
    Toast.show(message, Toast.SHORT);
  }

  capturePic = () => {
    this.refs.viewShot.capture().then((uri) => {
      const image = uri;
      if (Platform.OS === 'ios') {
        CameraRoll.saveToCameraRoll(image, 'photo');
      } else {
        const date = new Date();
        const nameFile = Math.floor(date.getTime() + date.getSeconds() / 2);
        const dirs = RNFetchBlob.fs.dirs;
        const path = `${dirs.DownloadDir}/${nameFile}.png`;
        RNFS.writeFile(path, image, 'base64').then(() => {});
      }
    });
  }

  goToGalery = () => {
    if (Platform.OS === 'android') { 
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((response) => {
        if (!response) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((res) => { 
            if (res !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePic();
            }
          });
        } else {
          this.capturePic();
        }
      });
    } else {
      Permissions.check('ios.permission.PHOTO_LIBRARY').then((response) => {
        if (response !== 'granted') {
          Permissions.request('ios.permission.PHOTO_LIBRARY').then((response) => {
            if (response !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePic();
            }
          });
        } else {
          this.capturePic();
        }
      });
    }
    
  }

  render () {
    const {resultData = {}, onClose = noop} = this.props;
    const transRefNum = result(resultData, 'transRefNum', '');
    const sourceAccount = result(resultData, 'sourceAccount', {});
    const sourceAccNumber = result(sourceAccount, 'accountNumber', '');
    const sourceAccProductType = result(sourceAccount, 'productType', '');
    const date = result(resultData, 'date', '');
    const transactionDate = moment(date).format('DD MMM YYYY');
    const startDate = result(resultData, 'startDate', '');
    const maturityDate = result(resultData, 'maturityDate', '');
    const cashbackAmount = result(resultData, 'cashbackAmount', '');
    const cashbackPercent = result(resultData, 'cashbackPercent', '');
    const period = result(resultData, 'period', '');
    const amount = result(resultData, 'amount', '');

    const options = {
      result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
      quality: 0.5,
      height: this.state.height,
      width: this.state.width
    };

    const status = result(resultData, 'status', '');
    const programTitle = result(resultData, 'programTitle', '');
    const programCode = result(resultData, 'programCode', '');
    const note = result(resultData, 'note', '');

    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled' bounces={false} contentContainerStyle={styles.contentContainerStyle}>
          <ViewShot onLayout={this.getScreenSize} ref='viewShot' options={options}>
            {
              status === 'SUCCESS' || status === 'PENDING' ?
                <View style={styles.topContainer}>
                  <View style={styles.header}>
                    <View style={styles.flex1}>
                      <Text style={Platform.OS === 'android' ? styles.status : styles.statusIOS}>{language.ULTRA_VOUCHER__HEADER_SUCCESS}</Text>
                    </View>
                  </View>

                  <View style={styles.whiteBoxContainer}>
                    <View style={styles.contentHeader}>
                      <View style={styles.logoAndDateContainer}>
                        <Image source={SimobiPlus} style={styles.simobiLogo} resizeMode={'contain'} />
                        <Text>{date}</Text>
                      </View>
                      <SimasIcon
                        name={status === 'SUCCESS' || status === 'PENDING' ? 'success-circle' : 'fail-circle'}
                        style={status === 'SUCCESS' ||  status === 'PENDING' ? styles.logoSuccess : styles.logoFail}
                        size={50}
                      />
                      <Text style={styles.contentHeaderStatus}>{!isEmpty(programTitle) ? programTitle + '\n' + language.SPECIAL_PROGRAM__OPENING_SUCCESS_SUFFIX : language.ULTRA_VOUCHER__STATUS_SUCCESS}</Text>
                      <View style={styles.refnumContainer}>
                        <Text style={styles.transRefNum}>{language.PAYMENT_STATUS__NO_TRANS} {transRefNum}</Text>
                      </View>
                    </View>
                    <View style={styles.greyLine} />

                    <View>
                      <Text style={styles.detailHeader}>{language.PAYMENT_STATUS__RECEIPT}</Text>
                      {programCode === 'SDU' ? 
                        <View style={styles.detailContainer}>
                          <View style={styles.detailRow}>
                            <Text style={styles.detailText}>{language.GENERIC__TITLE_COUPON}</Text>
                            <Text style={styles.detailValueText}>Rp {currencyFormatter(cashbackAmount)}</Text>
                          </View>
                          <View style={styles.detailRow}>
                            <Text style={styles.detailText}>{language.PAYMENT_STATUS__SOURCE_ACCOUNT}</Text>
                            <Text style={styles.detailValueText}>{sourceAccNumber}{'\n'}{sourceAccProductType}</Text>
                          </View>
                          <View style={styles.detailRow}>
                            <Text style={styles.detailText}>{language.SPECIAL_PROGRAM__LOCK_PERIOD}</Text>
                            <Text style={styles.detailValueText}>{period} {language.VALIDATE_DURATION__MONTHS}</Text>
                          </View>
                          <View style={styles.detailRow}>
                            <Text style={styles.detailText}>{language.SPECIAL_PROGRAM__START_DATE}</Text>
                            <Text style={styles.detailValueText}>{startDate}</Text>
                          </View>
                          <View style={styles.detailRow}>
                            <Text style={styles.detailText}>{language.SPECIAL_PROGRAM__MATURITY_DATE}</Text>
                            <Text style={styles.detailValueText}>{maturityDate}</Text>
                          </View>
                          <View style={styles.detailRow}>
                            <Text style={styles.detailText}>{language.GENERIC__TRANSACTION_DATE}</Text>
                            <Text style={styles.detailValueText}>{transactionDate}</Text>
                          </View>
                          <View style={styles.detailRow}>
                            <Text style={styles.detailText}>{language.SPECIAL_PROGRAM__INTEREST_RATE}</Text>
                            <Text style={styles.detailValueText}>{cashbackPercent}{language.SPECIAL_PROGRAM__PERCENT_PER_ANUM}</Text>
                          </View>
                          <View style={{...styles.greyLine, marginTop: 10}} />
                          <View style={styles.detailRow}>
                            <Text style={styles.totalText}>{language.SPECIAL_PROGRAM__NOMINAL_PLACEMENT}</Text>
                            <Text style={styles.totalValueText}>Rp {currencyFormatter(amount)}</Text>
                          </View>
                        </View>
                        : null
                      }
                      {note ?
                        <View style={styles.noteContainer}>
                          <SimasIcon name={'caution-circle'} size={20} style={styles.shareButtonText} />
                          <Text style={styles.noteValueText}>{note}</Text>
                        </View>
                        : null
                      }
                    </View>
                    <View style={{...styles.greyLine, marginTop: 10}} />

                    <View style={styles.footerContainer}>
                      <Text style={styles.noteText}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.footerTextRed} onPress={this.call}>1500 153</Text></Text>
                      <Text style={styles.footerTextGrey}>{language.PAYMENT__STATUS_REVAMP_HELP}</Text>
                    </View>
                  </View>
                </View>
                :
                // kalau status payment failed (tampilan lama)
                <View style={styles.failContainer}>
                  <View style={styles.logoAndDateContainerFail}>
                    <Image source={SimobiPlus} resizeMode={'contain'} />
                    <Text>{date}</Text>
                  </View>

                  <View style={styles.titleContainerFail}>
                    <Text style={styles.titleFail}>{!isEmpty(programTitle) ? programTitle + '\n' + language.SPECIAL_PROGRAM__OPENING_FAILED_SUFFIX : language.ULTRA_VOUCHER__STATUS_FAILED}</Text>
                    <SimasIcon name={'fail-circle'} size={50} style={styles.logoFail} />
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.textBlack}>{language.PAYMENT_STATUS__ID_TRANS}</Text>
                    <Text style={styles.textBlack}>{transRefNum}</Text>
                  </View>

                  <View style={styles.dashedLine} />

                  <Text style={styles.noteTextFail}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.footerTextRed} onPress={this.call}>1500 153</Text></Text>

                  <View style={styles.button}>
                    <SinarmasButton onPress={onClose}>
                      <Text style={styles.doneButtonText}>{language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}</Text>
                    </SinarmasButton>
                  </View>
                </View>
            }
          </ViewShot>


          {status === 'SUCCESS' || status === 'PENDING' ?
            <View>
              <View style={{...styles.whiteBoxContainer, marginTop: 0, paddingBottom: 20}}>
                <View style={styles.autoSaveContainer}>
                  <Touchable>
                    <View style={styles.checkboxRow}>
                      <CheckBox
                        onChange={this.toogleCheckbox}
                        uncheckedImage={CheckBoxSelected}
                        checkedImage={CheckBoxUnselected}
                        label={language.AUTO_SAVE_RECEIPT}
                        checkboxStyle={styles.checkboxStyle}
                        labelStyle={styles.checkboxLabel}
                        checked={!this.state.checked} // somehow checked value is reversed
                        dtActionName='Save Receipt'
                      />
                    </View>
                    <View>
                      <Text style={styles.footerTextGrey}>{language.AUTO_SAVE_DESCRIPTION}</Text>
                    </View>
                  </Touchable>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <SinarmasButton style={styles.shareButton} onPress={this.screenCapture}>
                    <Image source={shareIcon} style={styles.shareIcon}/>
                    <Text style={styles.shareButtonText}>{language.PAYMENT_STATUS__SHARE}</Text>
                  </SinarmasButton>
                </View>
                <View style={styles.button}>
                  <SinarmasButton onPress={onClose} style={styles.doneButton}>
                    <Text style={styles.doneButtonText}>{language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}</Text>
                  </SinarmasButton>
                </View>
              </View>
            </View>
            :
            null
          }
        </ScrollView>
      </View>
    );
  }
}

export default PaymentStatus;
