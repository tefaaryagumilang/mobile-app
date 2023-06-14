import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './SimasDoubleUntungSimulation.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {isEmpty, result, noop} from 'lodash';
import {SinarmasButton} from '../FormComponents';
import {RadioButtonSourceAcc, SinarmasInputBoxNewSplitBill, SinarmasPickerBoxNew, SinarmasInputBoxNew} from '../FormComponents';
import {Field} from 'redux-form';
import {normalizeAmount, formatFieldAmount, currencyFormatter} from '../../utils/transformer.util';
import iconRp from '../../assets/images/icon_rp.png';
import rewardImage from '../../assets/images/sdu-gift.png';
import rewardBackground from '../../assets/images/sdu-gift-background.png';

export const fields = {
  PERIOD_LIST: 'periodList',
  AMOUNT: 'amount',
  PERIOD: 'period',
  EMAIL: 'email',
  SOURCE_ACCOUNT: 'sourceAccount',
};

class SimasDoubleUntungSimulation extends React.Component {
  static propTypes = {
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    interest: PropTypes.number,
    navigation: PropTypes.object,
    displayAccounts: PropTypes.array,
    disabled: PropTypes.bool,
    cashbackPercent: PropTypes.string,
    cashbackAmount: PropTypes.string,
    getCashback: PropTypes.func,
    resetCashback: PropTypes.func,
    periodList: PropTypes.array,
    initialDeposit: PropTypes.string,
    validateAmount: PropTypes.func,
  }

  render () {
    const {formValues, displayAccounts, handleSubmit, disabled, cashbackPercent, getCashback, cashbackAmount, resetCashback, periodList, initialDeposit, validateAmount, ...reduxFormProps} = this.props;
    const {invalid, submitting} = reduxFormProps;
    const accountProductType = result(formValues, 'sourceAccount.productType', '');
    const accountBalance = result(formValues, 'sourceAccount.balances.availableBalance', '');
    const productTypeGold = accountProductType.toUpperCase().includes('GOLD');
    const periodIsSelected = !isEmpty(result(formValues, 'period', ''));
    const amountInputted = !isEmpty(result(formValues, 'amount', '')) && result(formValues, 'amount', '');
    const amountValid = validateAmount(accountBalance, amountInputted);
    const calculateReward = productTypeGold && periodIsSelected && amountInputted && amountValid;
    return (
      <View style={styles.container1}>
        <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} keyboardShouldPersistTaps='handled'>
          <View style={styles.container}>
            <View style={styles.pinkBackground} />

            <View style={styles.inputContainer}>
              <Text style={styles.containerTitle}>{language.GENERIC_BILLER__SET_AMOUNT}</Text>
              <View style={styles.inlineField}>
                <Image source={iconRp} style={styles.newRpIcon} />
                <Field
                  name={fields.AMOUNT}
                  component={SinarmasInputBoxNewSplitBill}
                  theme='primary'
                  placeholder={'0'}
                  typeField={'amount'}
                  maxLength={13}
                  keyboardType={'numeric'}
                  normalize={normalizeAmount}
                  format={formatFieldAmount}
                  isAmountSplitBill={true}
                  label={language.SIMAS_TARA_AMOUNT}
                  onBlur={calculateReward ? getCashback : resetCashback}
                  placeholderTextColor={styles.placeholderText}
                />
              </View>
              {!isEmpty(initialDeposit) && <Text style={styles.minimumNote}>{language.SPECIAL_PROGRAM__MIN_PLACEMENT}Rp{currencyFormatter(initialDeposit)}</Text>}

              <View style={styles.inlineField}>
                <Field
                  name={fields.PERIOD}
                  component={SinarmasPickerBoxNew}
                  placeholder={language.SPECIAL_PROGRAM__SELECT_LOCK_PERIOD}
                  itemList={periodList}
                  labelKey={'label'}
                  labelText={periodIsSelected ? language.SPECIAL_PROGRAM__LOCK_PERIOD : ''}
                  labelTextStyle={styles.labelTextStyle}
                  textPickerStyle={periodIsSelected ? styles.textPickerStyleWhenSelected : styles.textPickerStyle}
                  arrowPickerStyle={periodIsSelected ? styles.arrowPickerStyleWhenSelected : styles.arrowPickerStyle}
                  onChange={!calculateReward ? resetCashback : noop}
                />
              </View>

              <View style={styles.inlineField}>
                <Field
                  name={fields.EMAIL}
                  component={SinarmasInputBoxNew}
                  label={language.SPECIAL_PROGRAM__ENTER_EMAIL}
                  textStyle={styles.inputTextStyle}
                />
              </View>
            </View>

            <Text style={[styles.sourceAccountHeader, styles.containerTitle]}>{language.SPECIAL_PROGRAM__SOURCE_ACC}</Text>

            <View style={styles.sourceAccountContainer}>
              <Field 
                name={fields.SOURCE_ACCOUNT}
                component={RadioButtonSourceAcc}
                options={displayAccounts}
                separator={true}
                onChange={!calculateReward ? resetCashback : noop}
              />
            </View>

            <View style={styles.footNoteContainer}>
              <Image source={rewardBackground} style={styles.rewardBackground} />
              <Image source={rewardImage} style={styles.rewardImage} />
              {!isEmpty(cashbackAmount) && !isEmpty(cashbackPercent) ?
                <View style={styles.cashbackContainer}>
                  <Text style={styles.cashbackTitle}>{language.SPECIAL_PROGRAM__REWARD_PREFIX} Rp{currencyFormatter(cashbackAmount)}</Text>
                  <Text style={styles.cashbackSubtitle}>{language.SPECIAL_PROGRAM__REWARD_NOTE}</Text>
                </View>
                :
                <View style={styles.cashbackContainer}>
                  <Text style={styles.cashbackTitle}>{language.SPECIAL_PROGRAM__REWARD_PREFIX}...</Text>
                  {!periodIsSelected ?
                    <Text style={styles.cashbackSubtitle}>{language.SPECIAL_PROGRAM__REWARD_SELECT_PERIOD}</Text>
                    : !amountInputted || !amountValid ?
                      <Text style={styles.cashbackSubtitle}>{language.SPECIAL_PROGRAM__REWARD_INPUT_AMOUNT}</Text> 
                      : 
                      <Text style={styles.cashbackSubtitle}>{language.SPECIAL_PROGRAM__REWARD_SELECT_ACCOUNT}</Text> 
                  }
                </View>
              }
            </View>

            <View style={styles.footNoteContainer}>
              <SimasIcon name={'caution-circle'} style={styles.cautionIcon} size={20} />
              <Text style={styles.footNote}>{language.SPECIAL_PROGRAM__INTEREST_RATE} {cashbackPercent || '-'}{language.SPECIAL_PROGRAM__PERCENT_PER_ANUM}. {language.SPECIAL_PROGRAM__INTEREST_NOTE}</Text>
            </View>
            
            <View style={styles.footNoteContainer}>
              <SimasIcon name={'caution-circle'} style={styles.cautionIcon} size={20} />
              <Text style={styles.footNote}>{language.SPECIAL_PROGRAM__EMAIL_NOTE}</Text>
            </View>            
          </View>
        </KeyboardAwareScrollView>
        
        <View style={styles.buttonWrapper}>
          <SinarmasButton disabled={invalid || submitting || disabled || !productTypeGold || isEmpty(cashbackAmount)} onPress={handleSubmit}>
            <Text style={styles.buttonLargeTextStyle}>{language.BUTTON__NEXT_CAPITAL}</Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default SimasDoubleUntungSimulation;
