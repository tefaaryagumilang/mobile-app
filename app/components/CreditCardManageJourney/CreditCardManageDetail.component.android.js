import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Text,
  View,
  Platform
} from 'react-native';
import styles from './CreditCardManageDetail.styles';
import {result, startsWith} from 'lodash';
import {creditCardNumberFormat, dateFormatter, generateCcImage} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import moment from 'moment';
import {language} from '../../config/language';
import AnimatedElevatedView from '../ElevatedView/AnimatedElevatedView.component';
import {SinarmasButton} from '../FormComponents';

const HEADER_MAX_HEIGHT = styles.headerMaxHeight;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 170 : 183;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class Transactions extends Component {
  static propTypes = {
    transactions: PropTypes.array,
    goToDetailTransaction: PropTypes.func,
    currency: PropTypes.string,
    isShariaAccount: PropTypes.bool,
    selectedAccount: PropTypes.object,
    header: PropTypes.string,
    goToFilter: PropTypes.func,
    selectedFilterType: PropTypes.number,
    creditCardDetail: PropTypes.object,
    confirmBlockCreditCard: PropTypes.func,
    handleSubmit: PropTypes.func,
    isChangePin: PropTypes.bool,
    error: PropTypes.string,
  }

  state = {
    scrollY: new Animated.Value(
      // iOS has negative initial scroll value because content inset...
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
    ),
    refreshing: false,
    viewOffset: new Animated.Value(HEADER_MAX_HEIGHT)
  }

  generateColors = (accountNumber = '') => {
    let cardStyle = {color: styles.gradientOrange, image: generateCcImage(accountNumber)};
    if (startsWith(accountNumber, '489372')) {
      cardStyle = {color: styles.gradientBlack, image: generateCcImage(accountNumber)};
    } else if (startsWith(accountNumber, '489373')) {
      cardStyle = {color: styles.gradientGold, image: generateCcImage(accountNumber)};
    } else if (startsWith(accountNumber, '421469')) {
      cardStyle = {color: styles.gradientPink, image: generateCcImage(accountNumber)};
    } else if (startsWith(accountNumber, '421456')) {
      cardStyle = {color: styles.gradientOrange, image: generateCcImage(accountNumber)};
    } else {
      cardStyle = {color: styles.gradientGrey, image: generateCcImage(accountNumber)};
    }
    return cardStyle;
  }

  blockCreditCard = () => {
    const {confirmBlockCreditCard, selectedAccount = {}} = this.props;
    confirmBlockCreditCard(selectedAccount);
  }

  render () {
    const {selectedAccount = {}} = this.props;
    const {accountNumber = '', name = '', cardBase} = selectedAccount;
    const cardBaseText = cardBase === 'virtualCreditCard' ? 'Virtual Credit Card' : 'Physical Credit Card';
    const cardExpired = dateFormatter(moment(result(selectedAccount, 'expiryDate', ''), 'YYYYMM'), 'MM/YY');
    const cardStyle = this.generateColors(accountNumber);
    const dtCCSource = 'Summary Portfolio (Open Tab Account) - Open Tab Credit Card - Manage Credit Card - Temporary Block Card - ';
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -65],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <View style={[styles.placeholderHeader, {backgroundColor: cardStyle.color[0]}]}/>
        <Animated.View
          pointerEvents='none'
          style={[
            styles.header,
            {transform: [{translateY: headerTranslate}]},
          ]}
        >
          <AnimatedElevatedView elevation={5} style={[styles.backgroundContainer, {
            opacity: imageOpacity,
            height: HEADER_MAX_HEIGHT - 40
          }]}>
            <Animated.Image
              style={[
                styles.backgroundImage,
                {
                  height: HEADER_MAX_HEIGHT - 40
                },
              ]}
              source={result(cardStyle, 'image', '')}
            />
          </AnimatedElevatedView>
        </Animated.View>

        <Animated.View
          style={[
            styles.bar,
            {
              marginTop: Platform.OS === 'ios' ? 28 : 38,
              transform: [
                {translateY: titleTranslate},
              ],
            },
          ]}
        >
          <View style={styles.card}>
            <Text style={styles.creditCardAccountNumberValue}>{creditCardNumberFormat(accountNumber)}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingRight: 5}}>
                <Text style={styles.creditCardExpiryTitle}>Expiry</Text>
                <Text style={styles.creditCardExpiryTitle}>Date</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.creditCardExpiry}>{cardExpired}</Text>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.creditCardAccountName}>{name}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.ScrollView
          style={[styles.transactionContainer]}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {
              contentOffset: {
                y: this.state.scrollY
              }
            }}],
            {useNativeDriver: true},
          )}
          contentContainerStyle = {{paddingTop: HEADER_MAX_HEIGHT}}
        >
          <View style={styles.detailContainer1}>
            <View style={styles.detailsContainer2}>
              <Text>{creditCardNumberFormat(accountNumber)}</Text>
              <Text>{name}</Text>
              <Text>{cardBaseText}</Text>
            </View>
          </View>
          <View style={styles.extraPadding}/>
        </Animated.ScrollView>

        <View style={styles.containtextExplanation}>
          <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
          <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.DASHBOARD__CREDIT_EXPLANATION}</Text></View>
        </View>
        <View style={styles.buttonContainer2}>
          <SinarmasButton dtActionName={dtCCSource + language.GENERIC__BLOCK} text={language.GENERIC__BLOCK} onPress={this.blockCreditCard}/>
        </View>
      </View>
    );
  }
}
