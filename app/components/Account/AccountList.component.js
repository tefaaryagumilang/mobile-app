import {View, Text, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SourceAccount.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import {result, isEmpty} from 'lodash';
import {currencyFormatter} from '../../utils/transformer.util';
import savingPay from '../../assets/images/saving-paycard.png';
import emoney from '../../assets/images/simas-emoney.png';

class EmallAccounts extends React.Component {
  static propTypes = {
    accountNumber: PropTypes.string,
    id: PropTypes.string,
    productType: PropTypes.string,
    name: PropTypes.string,
    balances: PropTypes.object,
    getConfirmation: PropTypes.func,
    accountType: PropTypes.string,
    simasPoin: PropTypes.object,
    currency: PropTypes.func,
    creditAvailable: PropTypes.string,
    getCreditCardBalance: PropTypes.func,
    billerName: PropTypes.string,
    billerType: PropTypes.string,
    billerCategory: PropTypes.bool,
    billerCategoryPostpaid: PropTypes.bool,
    navigation: PropTypes.object,
    getdynatrace: PropTypes.func,
  }

  getCreditCardAvailable = () => {
    const {id, getCreditCardBalance} = this.props;
    getCreditCardBalance(id);
  }

  render () {
    const {accountNumber, productType, name, balances, getConfirmation, currency = 'IDR', creditAvailable, billerName, billerType = '', billerCategory, billerCategoryPostpaid, getdynatrace} = this.props;
    const creditBalance = !isEmpty(creditAvailable) ? parseInt(creditAvailable.replace(/[^0-9.]+/g, '')) : '--';
    const creditBalanceShow = !isEmpty(creditAvailable) ? currencyFormatter(creditBalance) : '--';
    const availableBalance = result(balances, 'availableBalance', '');
    let billerNameDt;
    if (billerName === 'Go-Pay Customer') {
      billerNameDt = 'Gopay';
    } else {
      billerNameDt = billerName;
    }
    let sourceOfFundSelected = '';
    const dynatrace = getdynatrace;
    if (!isEmpty(billerName)) {
      if (billerNameDt === 'PLN Postpaid' || billerNameDt === 'PLN Prepaid' || billerNameDt === 'PLN Non Taglis' || (billerType === '1' && !billerCategoryPostpaid) || billerType === '2'
      || billerType === '3' || billerType === '8' || billerType === '10' || billerType === '5') {
        sourceOfFundSelected = billerNameDt + ' - ' + 'select source account';
      } else if (billerCategory) {
        sourceOfFundSelected = 'Biller ' + billerNameDt + ' - ' + 'select source account';
      } else if (billerCategoryPostpaid) {
        sourceOfFundSelected = 'Postpaid Telco - select source account';
      } else {
        sourceOfFundSelected = 'Prepaid Telco - select source account';
      }
    } else {
      sourceOfFundSelected = dynatrace + ' - Select Source Account';
    }
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View>
          { productType === 'SimasPoinAccount' || productType === 'Simas Poin Account' ? 
            null
            :
            <View style={styles.bgWhite}>
              <Touchable dtActionName={sourceOfFundSelected} onPress={getConfirmation}>
                <View style={styles.row}>
                  <View style={styles.iconContainer}>
                    <Image source={productType === 'Emoney Account' ? emoney : savingPay} style={productType === 'Emoney Account' ? styles.imageOfferEmoney : styles.imageOffer2} />
                  </View>
                  <View style={styles.infoContainer}>
                    <View style={styles.pad2}>
                      <Text style={styles.accTxt2}>{accountNumber}</Text>
                    </View>
                    <View style={styles.pad2}>
                      <Text style={styles.typeTxt}>{productType}</Text>
                    </View>
                    <View style={styles.pad2}>
                      <Text style={styles.nameTxt}>{name}</Text>
                    </View>
                    <View style={styles.pad2}>
                      {productType !== 'Credit Card' ?
                        <Text style={styles.balanceTxt}>{currency} {currencyFormatter(availableBalance)}</Text>
                        :
                        isEmpty(creditAvailable) ?
                          <Touchable onPress={this.getCreditCardAvailable}>
                            <Text style={styles.balanceTxt}>{language.DASHBOARD__TAP_TO_RELOAD}</Text>
                          </Touchable>
                          :
                          <Text style={styles.balanceTxt}>{language.CGV__AVAIL_BALANCE + ' ' + creditBalanceShow}</Text>
                      }
                    </View>
                  </View>
                  <View style={styles.arrowContainer}>
                    <SimasIcon name={'arrow'} size={10} style={styles.arrowIcon}/>
                  </View>
                </View>
              </Touchable>
            </View>
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default EmallAccounts;
