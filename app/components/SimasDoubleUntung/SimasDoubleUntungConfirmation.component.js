import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './SimasDoubleUntungConfirmation.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {result, isEmpty} from 'lodash';
import {SinarmasButton} from '../FormComponents';
import {currencyFormatter} from '../../utils/transformer.util';
import iconRp from '../../assets/images/icon_rp.png';
import rewardImage from '../../assets/images/sdu-gift.png';
import rewardBackground from '../../assets/images/sdu-gift-background.png';

class SimasDoubleUntungConfirmation extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    selectedAccount: PropTypes.object,
    period: PropTypes.object,
    amount: PropTypes.string,
    email: PropTypes.string,
    periodValue: PropTypes.string,
    startDate: PropTypes.string,
    maturityDate: PropTypes.string,
    onSubmit: PropTypes.func,
    cashbackAmount: PropTypes.string,
    cashbackPercent: PropTypes.string,
  }

  render () {
    const {selectedAccount, amount, email, periodValue, startDate, maturityDate, onSubmit, cashbackAmount, cashbackPercent} = this.props;
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    const accountProductType = result(selectedAccount, 'productType', '');
    return (
      <View style={styles.container1}>
        <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} keyboardShouldPersistTaps='handled'>
          <View style={styles.container}>
            <View style={styles.pinkBackground} />

            <View style={styles.inputContainer}>
              <Text style={styles.containerTitle}>{language.SPECIAL_PROGRAM__NOMINAL_PLACEMENT}</Text>
              <View style={styles.amountBox}>
                <Image source={iconRp} style={styles.newRpIcon} />
                <Text style={styles.amount}>{currencyFormatter(amount)}</Text>
              </View>
            </View>

            <Text style={[styles.summaryHeader, styles.containerTitle]}>{language.CARDLESSWITHDRAWAL__SUMMARY}</Text>

            <View style={styles.summaryContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>{language.COMMON__EMAIL}</Text>
                <Text style={styles.detailValueText}>{email}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>{language.SPECIAL_PROGRAM__SOURCE_ACC}</Text>
                <Text style={styles.detailValueText}>{accountNumber}{'\n'}{accountProductType}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>{language.SPECIAL_PROGRAM__LOCK_PERIOD}</Text>
                <Text style={styles.detailValueText}>{periodValue} months</Text>
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
                <Text style={styles.detailText}>{language.SPECIAL_PROGRAM__INTEREST_RATE}</Text>
                <Text style={styles.detailValueText}>{cashbackPercent || '-'}{language.SPECIAL_PROGRAM__PERCENT_PER_ANUM}</Text>
              </View>
            </View>

            {!isEmpty(cashbackAmount.toString()) ?
              <View style={styles.footNoteContainer}>
                <Image source={rewardBackground} style={styles.rewardBackground} />
                <Image source={rewardImage} style={styles.rewardImage} />
                <View style={styles.cashbackContainer}>
                  <Text style={styles.cashbackTitle}>{language.SPECIAL_PROGRAM__REWARD_PREFIX} Rp{currencyFormatter(cashbackAmount)}</Text> 
                  <Text style={styles.cashbackSubtitle}>{language.SPECIAL_PROGRAM__REWARD_NOTE}</Text>
                </View>
              </View>
              : null
            }

            <View style={styles.footNoteContainer}>
              <SimasIcon name={'caution-circle'} style={styles.cautionIcon} size={20} />
              <Text style={styles.footNote}>{language.SPECIAL_PROGRAM__INTEREST_RATE} {cashbackPercent || '-'}{language.SPECIAL_PROGRAM__PERCENT_PER_ANUM}. {language.SPECIAL_PROGRAM__INTEREST_NOTE}</Text>
            </View>       
          </View>
        </KeyboardAwareScrollView>
        
        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={onSubmit}>
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default SimasDoubleUntungConfirmation;