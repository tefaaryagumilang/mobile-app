import {View, Text, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './TrackAtmCard.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {result, map, isEmpty} from 'lodash';
import moment from 'moment';
import {getDayName} from '../../utils/transformer.util';
import {popUpActivate} from '../../state/thunks/common.thunks';
import statusSubmitted from '../../assets/images/Status-Submitted.png';
import submittedDone from '../../assets/images/Done-Submitted.png';
import onProcessGrey from '../../assets/images/Grey-OnProcess.png';
import statusOnProcess from '../../assets/images/Status-OnProcess.png';
import onProcessDone from '../../assets/images/Done-OnProcess.png';
import shippingGrey from '../../assets/images/Grey-Shipping.png';
import statusShipping from '../../assets/images/Status-Shipping.png';
import shippingDone from '../../assets/images/Done-Shipping.png';
import deliveredGrey from '../../assets/images/Grey-Delivered.png';
import statusDelivered from '../../assets/images/Status-Delivered.png';
import deliveredDone from '../../assets/images/Done-Delivered.png';
import activeGrey from '../../assets/images/Grey-Active.png';
import statusActive from '../../assets/images/Status-Active.png';

const mapStateToProps = (state) => ({
  accountsCust: result(state, 'accounts', []),
});

const mapDispatchToProps = (dispatch) => ({
  getPopUpActivate: (accName, accountNo, idCard, cardNo, contractCard, bankBranchName, nameFull) => () => dispatch(popUpActivate(accName, accountNo, idCard, cardNo, contractCard, bankBranchName, nameFull)),
});

class TrackAtmDetailStatus extends React.Component {
  static propTypes = {
    detailStatusTrack: PropTypes.object,
    goToActivateCard: PropTypes.func,
  }

  render () {
    const {detailStatusTrack, goToActivateCard} = this.props;
    const statusTrack = result(detailStatusTrack, 'cardStatus', '').toString();
    const dataList = result(detailStatusTrack, 'dataList', []);
    const joinedDateTimeStatus = dataList.map((list) => list.dateTimeStatus).join(', ');
    const dateTimeStatus = joinedDateTimeStatus.split(', ');
    const mapStatusDateTimeDisplay =  map(dateTimeStatus, (data, i) => {
      const displayDateTime = getDayName(data).slice(0, 3) + ', ' + moment(dateTimeStatus[i]).format('DD MMM YYYY HH:mm');
      return displayDateTime;
    });
    const disabled = statusTrack !== '5';
    const deliveryMessageShipping = result(dataList, '[4].deliveryMessage', '');
    const deliveryMessageDelivered = result(dataList, '[5].deliveryMessage', '');
    const dateTimeSubmitted = result(mapStatusDateTimeDisplay, '[0]', '');
    const dateTimeOnProcess = result(mapStatusDateTimeDisplay, '[1]', '');
    const dateTimeReadyToPrint = result(mapStatusDateTimeDisplay, '[2]', '');
    const dateTimeReadyToShip = result(mapStatusDateTimeDisplay, '[3]', '');
    const dateTimeShipping = result(mapStatusDateTimeDisplay, '[4]', '');
    const dateTimeDelivered = result(mapStatusDateTimeDisplay, '[5]', '');
    const dateTimeActive = result(mapStatusDateTimeDisplay, '[6]', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120} contentContainerStyle={styles.containerContentDetailStatus} style={styles.containerDetailStatus}>
        <View>
          <View style={styles.detailStatusContainer}>
            <View style={styles.containerImageStatus}>
              <View>
                <Text style={styles.titleYourCard}>{statusTrack === '0' ? language.TITLE__YOUR_CARD_SUBMITTED : statusTrack === '1' || statusTrack === '2' || statusTrack === '3' ? language.TITLE__YOUR_CARD_ON_PROCESS : statusTrack === '4' ? language.TITLE__YOUR_CARD_ON_DELIVERY : statusTrack === '5' ? language.TITLE__YOUR_CARD_DELIVERED : statusTrack === '6' ? language.TITLE__YOUR_CARD_ACTIVE : null}</Text>
              </View>
              <View style={styles.containerFlexRow}>
                {statusTrack === '0' ?
                  <View>
                    <Image source={statusSubmitted} style={styles.imageIconStatusTrack}/>
                    <View style={styles.verticalLineGreySubmitted}/>
                  </View> :
                  <View>
                    <Image source={submittedDone} style={styles.imageIconStatusTrack}/>
                    <View style={styles.verticalLineBrand}/>
                  </View>
                }
                <View>
                  <View style={styles.containerTextTitleStatus}>
                    <Text style={styles.textTitleStatus}>{language.TRACK_ATM__STATUS}</Text>
                    <Text style={styles.textStatusTrack}>{language.TRACK_ATM__STATUS_SUBMITTED}</Text>
                  </View>
                  {statusTrack === '0' || statusTrack === '1' || statusTrack === '2' || statusTrack === '3' || statusTrack === '4' || statusTrack === '5' || statusTrack === '6' ?
                    <View style={styles.containerTextDateTimeStatus}>
                      <View style={styles.viewTextDateTimeStatus}>
                        <View style={styles.containerFlexRow}>
                          <Text style={styles.textDateTimeTitle}>{language.TRACK_ATM__STATUS_SUBMITTED}</Text>
                          <Text style={styles.textDateTimeValue}> : {dateTimeSubmitted}</Text>
                        </View>
                      </View>
                    </View> : null
                  }
                </View>
              </View>
            
              <View style={styles.containerFlexRow}>
                {statusTrack === '0' ?
                  <View>
                    <Image source={onProcessGrey} style={styles.imageIconStatusTrack}/>
                    <View style={styles.verticalLineGrey}/>
                  </View> : statusTrack === '1' || statusTrack === '2' || statusTrack === '3' ?
                    <View>
                      <Image source={statusOnProcess} style={styles.imageIconStatusTrack}/>
                      <View style={styles.verticalLineGreyOnProcess}/>
                    </View> :
                    <View>
                      <Image source={onProcessDone} style={styles.imageIconStatusTrack}/>
                      <View style={styles.verticalLineBrand}/>
                    </View>
                }
                <View>
                  <View style={styles.containerTextTitleStatus}>
                    <Text style={styles.textTitleStatus}>{language.TRACK_ATM__STATUS}</Text>
                    <Text style={styles.textStatusTrack}>{language.TRACK_ATM__STATUS_ON_PROCESS}</Text>
                  </View>
                  {statusTrack === '1' ?
                    <View style={styles.containerTextDateTimeStatus}>
                      <View style={styles.viewTextDateTimeStatus}>
                        <View style={styles.containerFlexRow}>
                          <Text style={styles.textDateTimeTitle}>{language.TRACK_ATM__STATUS_ON_PROCESS}</Text>
                          <Text style={styles.textDateTimeValue}> : {dateTimeOnProcess}</Text>
                        </View>
                      </View>
                    </View> : statusTrack === '2' ?
                      <View style={styles.containerTextDateTimeStatus}>
                        <View style={styles.viewTextDateTimeStatus}>
                          <View style={styles.containerFlexRow}>
                            <Text style={styles.textDateTimeTitle}>{language.TRACK_ATM__STATUS_ON_PROCESS}</Text>
                            <Text style={styles.textDateTimeValue}> : {dateTimeReadyToPrint}</Text>
                          </View>
                        </View>
                      </View> : statusTrack === '3' || statusTrack === '4' || statusTrack === '5' || statusTrack === '6' ?
                        <View style={styles.containerTextDateTimeStatus}>
                          <View style={styles.viewTextDateTimeStatus}>
                            <View style={styles.containerFlexRow}>
                              <Text style={styles.textDateTimeTitle}>{language.TRACK_ATM__STATUS_ON_PROCESS}</Text>
                              <Text style={styles.textDateTimeValue}> : {dateTimeReadyToShip}</Text>
                            </View>
                          </View>
                        </View> : null
                  }
                </View>
              </View>
            
              <View style={styles.containerFlexRow}>
                {statusTrack === '4' ?
                  <View>
                    <Image source={statusShipping} style={styles.imageIconStatusTrack}/>
                    <View style={styles.verticalLineGreyShipping}/>
                  </View> : statusTrack === '5' || statusTrack === '6' ?
                    <View>
                      <Image source={shippingDone} style={styles.imageIconStatusTrack}/>
                      <View style={styles.verticalLineBrand}/>
                    </View> :
                    <View>
                      <Image source={shippingGrey} style={styles.imageIconStatusTrack}/>
                      <View style={styles.verticalLineGrey}/>
                    </View>
                }
                <View>
                  <View style={styles.containerTextTitleStatus}>
                    <Text style={styles.textTitleStatus}>{language.TRACK_ATM__STATUS}</Text>
                    <Text style={styles.textStatusTrack}>{language.TRACK_ATM__STATUS_SHIPPING}</Text>
                  </View>
                  {statusTrack === '4' || statusTrack === '5' || statusTrack === '6' ?
                    <View style={styles.containerTextDateTimeStatus}>
                      <View style={styles.viewTextDateTimeStatus}>
                        <View style={styles.containerFlexRow}>
                          <Text style={styles.textDateTimeTitle}>{language.TRACK_ATM__STATUS_SHIPPING}</Text>
                          <Text style={styles.textDateTimeValue}> : {dateTimeShipping}</Text>
                        </View>
                        {!isEmpty(deliveryMessageShipping) ? <Text style={styles.textDateTimeTitle}>{deliveryMessageShipping}</Text> : null}
                      </View>
                    </View> : null
                  }
                </View>
              </View>
            
              <View style={styles.containerFlexRow}>
                {statusTrack === '5' ?
                  <View>
                    <Image source={statusDelivered} style={styles.imageIconStatusTrack}/>
                    <View style={styles.verticalLineGreyDelivered}/>
                  </View> : statusTrack === '6' ?
                    <View>
                      <Image source={deliveredDone} style={styles.imageIconStatusTrack}/>
                      <View style={styles.verticalLineBrand}/>
                    </View> :
                    <View>
                      <Image source={deliveredGrey} style={styles.imageIconStatusTrack}/>
                      <View style={styles.verticalLineGrey}/>
                    </View>
                }
                <View>
                  <View style={styles.containerTextTitleStatus}>
                    <Text style={styles.textTitleStatus}>{language.TRACK_ATM__STATUS}</Text>
                    <Text style={styles.textStatusTrack}>{language.TRACK_ATM__STATUS_DELIVERED}</Text>
                  </View>
                  {statusTrack === '5' || statusTrack === '6' ?
                    <View style={styles.containerTextDateTimeStatus}>
                      <View style={styles.viewTextDateTimeStatus}>
                        <View style={styles.containerFlexRow}>
                          <Text style={styles.textDateTimeTitle}>{language.TRACK_ATM__STATUS_DELIVERED}</Text>
                          <Text style={styles.textDateTimeValue}> : {dateTimeDelivered}</Text>
                        </View>
                        {!isEmpty(deliveryMessageDelivered) ? <Text style={styles.textDateTimeTitle}>{deliveryMessageDelivered}</Text> : null}
                      </View>
                    </View> : null
                  }
                </View>
              </View>
            
              <View style={styles.containerFlexRow}>
                {statusTrack === '6' ?
                  <View>
                    <Image source={statusActive} style={styles.imageIconStatusTrack}/>
                  </View> :
                  <View>
                    <Image source={activeGrey} style={styles.imageIconStatusTrack}/>
                  </View>
                }
                <View>
                  <View style={styles.containerTextTitleStatus}>
                    <Text style={styles.textTitleStatus}>{language.TRACK_ATM__STATUS}</Text>
                    <Text style={styles.textStatusTrack}>{language.TRACK_ATM__STATUS_ACTIVE}</Text>
                  </View>
                  {statusTrack === '6' ?
                    <View style={styles.containerTextDateTimeStatus}>
                      <View style={styles.viewTextDateTimeStatusActive}>
                        <View style={styles.containerFlexRow}>
                          <Text style={styles.textDateTimeTitle}>{language.TRACK_ATM__STATUS_ACTIVE}</Text>
                          <Text style={styles.textDateTimeValue}> : {dateTimeActive}</Text>
                        </View>
                      </View>
                    </View> : null
                  }
                </View>
              </View>
            </View>
          </View>
          {statusTrack === '6' ?
            <View style={styles.padding}/> :
            <SinarmasButton style={styles.styleButtonActivateCard} onPress={goToActivateCard} disabled={disabled}>
              <Text style={styles.buttonActivateCard}>{language.BUTTON_ACTIVATE_CARD}</Text>
            </SinarmasButton>
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackAtmDetailStatus);
