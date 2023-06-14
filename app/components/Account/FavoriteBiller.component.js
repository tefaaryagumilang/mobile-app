import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList, TextInput, ActivityIndicator, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './FavoriteBiller.styles';
import result from 'lodash/result';
import Touchable from '../Touchable.component';
import {noop, find, filter, includes, isEmpty} from 'lodash';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';
import {SwipeRow} from 'react-native-swipe-list-view';
import Overlay from '../Overlay/Overlay.component';
import {SinarmasPickerLine, SinarmasInput, SinarmasPicker, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {formatFieldAccount, formatFieldNote, formatPayeeName} from '../../utils/transformer.util';

class FavoriteBiller extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToBiller: PropTypes.func,
    billerList: PropTypes.array,
    closeOnTouchOutside: PropTypes.bool,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    newBiller: PropTypes.bool,
    newBank: PropTypes.bool,
    saveFavorite: PropTypes.func,
    deleteFavorite: PropTypes.func,
    editFavorite: PropTypes.func,
    billerFavorite: PropTypes.object,
    reloadHistory: PropTypes.func,
    goToPayee: PropTypes.func,
    bankList: PropTypes.array,
    dispatch: PropTypes.func,
    goToAddPayee: PropTypes.func,
    favForm: PropTypes.object,
    originalName: PropTypes.string,
    saveFavoriteBank: PropTypes.func,
    smsOTPBeforeFav: PropTypes.func,
    editFavoriteBank: PropTypes.func,
    goBack: PropTypes.func,
  }

  state = {
    searchFilter: '',
    newBiller: false,
    newBank: false,
  }

  static defaultProps = {
    visible: false,
    onClose: noop,
  }

  filterChange = (searchFilter) => {
    this.setState({searchFilter});
  }

  onClose = () => {
    this.setState({visible: false, newBiller: false, newBank: false});
  }

  saveToFavorite = () => {
    const {smsOTPBeforeFav = noop, navigation} = this.props;
    const filterData = result(navigation, 'state.params.favFilter', '');
    this.setState({visible: false, newBiller: false, newBank: false});
    smsOTPBeforeFav(filterData);
  }

  saveToFavoriteBank = () => {
    const {saveFavoriteBank = noop} = this.props;
    this.setState({visible: false, newBiller: false, newBank: false});
    saveFavoriteBank();
  }

  showFavorite = () => {
    this.setState({visible: !this.state.visible});
  }

  goNewBiller = () => {
    this.setState({newBiller: true});
    this.setState({newBank: false});
  }

  goNewBank = () => {
    this.setState({newBank: true});
    this.setState({newBiller: false});
  }

  renderBillerList = ({item}) => {
    const {navigation, billerList, goToBiller = noop, deleteFavorite = noop, editFavorite = noop, goToPayee = noop, editFavoriteBank = noop} = this.props;
    const filterData = result(navigation, 'state.params.favFilter', '');

    const biller = find(billerList, (biller) => biller.id === item.billerId);
    const favBill = item;
    const targetType = result(favBill, 'targetType', '');
    const description = result(favBill, 'description', '');
    const subscriberNo = result(favBill, 'subscriberNo', '');
    const targetAccountNumber = result(favBill, 'accountNumber', '');
    const targetAccountName = result(favBill, 'name', '');
    const targetAccountBank = targetType === 'inbanktransfer' ? result(favBill, 'accountType', '') : result(favBill, 'bankName', '');
    const billerName = result(biller, 'name', '');
    const favoriteType = result(item, 'favoriteType', '');

    return (
      <SwipeRow swipeToOpenPercent={10} rightOpenValue={-54} leftOpenValue={54}>
        { favoriteType === 'billPayment' ?
          <View style={styles.rowSwipe}>
            <Touchable onPress={editFavorite({item})} style={styles.editIcon}>
              <SimasIcon name='edit-amount' style={styles.whiteIcon} size={24}/>
            </Touchable>
            <Touchable onPress={deleteFavorite({item})} style={styles.trash}>
              <SimasIcon name='trash' style={styles.whiteIcon} size={24}/>
            </Touchable>
          </View>
          :
          <View key={item.index} style={styles.rowSwipe}>
            <Touchable onPress={editFavoriteBank({item})} style={styles.editIcon}>
              <SimasIcon name='edit-amount' style={styles.whiteIcon} size={24}/>
            </Touchable>
            <Touchable onPress={deleteFavorite({item})} style={styles.trash}>
              <SimasIcon name='trash' style={styles.whiteIcon} size={24}/>
            </Touchable>
          </View>
        }
        <View key={item.index}>
          <Touchable
            onPress={
              (favoriteType === 'billPayment') ?
                goToBiller(biller, subscriberNo, description, favBill, filterData)
                : goToPayee(favBill) }
            style={styles.historyItem} highlightOpacity={1}>
            <View>
              { favoriteType === 'billPayment' && description === '' || favoriteType === 'billPayment' && description === ' ' || favoriteType === 'billPayment' && description === null ?
                <Text style={styles.desc}>{billerName}</Text>
                : favoriteType === '' && description === '' || favoriteType === '' && description === ' ' || favoriteType === '' && description === null ?
                  <Text style={styles.desc}>{targetAccountName}</Text>
                  :
                  <Text style={styles.desc}>{description}</Text>
              }
            </View>
            <View style={styles.historyItemRow}>
              <View style={styles.flex}>
                { favoriteType === 'billPayment' ?
                  <Text style={styles.subNo}>{subscriberNo}</Text>
                  :
                  <Text style={styles.subNo}>{targetAccountNumber}</Text>
                }
              </View>
              { favoriteType === 'billPayment' ?
                <View style={styles.billerDetails}>
                  <Text style={styles.billerName}>{billerName}</Text>
                  <SimasIcon name='arrow' style={styles.redArrow} size={10}/>
                </View>
                :
                <View style={styles.billerDetails}>
                  <Text style={styles.billerName}>{targetAccountBank}</Text>
                  <SimasIcon name='arrow' style={styles.redArrow} size={10}/>
                </View>
              }
            </View>
          </Touchable>
        </View>
       
      </SwipeRow>
    );
  }

  render () {
    const {navigation, billerList, closeOnTouchOutside = true, billerFavorite, reloadHistory, bankList, goToAddPayee, favForm, originalName, goBack} = this.props;
    const {searchFilter} = this.state;
    const filterData = result(navigation, 'state.params.favFilter', '');
    const payeeAccNo = result(favForm, 'payeeAccNo', '');
    const status = result(billerFavorite, 'status', 'loading');
    const historyTrf = filter(billerFavorite, (item) => {
      if (result(item, 'accountNumber', '') !== '') {
        const accountName = result(item, 'name', '');
        const accountNumber = result(item, 'accountNumber', '');
        const accountBank = result(item, 'bankName', '');
        const accountType = result(item, 'accountType', '');
        const description = result(item, 'description', '');
        return includes(accountName.toUpperCase(), searchFilter.toUpperCase()) || includes(accountNumber, searchFilter) || includes(accountBank.toUpperCase(), searchFilter.toUpperCase()) || includes(accountType, searchFilter) || includes(description, searchFilter);
      }
    });
    const historyBiller = filter(billerFavorite, (item) => {
      if ((result(item, 'billerType', '') !== '')) {
        const biller = find(billerList, (biller) => biller.id === item.billerId);
        const billerName = result(biller, 'name', '');
        const description = result(item, 'description', '');
        return includes(item.subscriberNo, searchFilter) || includes(billerName, searchFilter) || includes(description, searchFilter);
      }
    });
    const history = filter(billerFavorite, (item) => {
      if (result(item, 'description', null) !== null) {
        const biller = find(billerList, (biller) => biller.id === item.billerId);
        const billerName = result(biller, 'name', '');
        const description = result(item, 'description', '');
        const accountName = result(item, 'name', '');
        const accountNumber = result(item, 'accountNumber', '');
        const accountBank = result(item, 'bankName', '');
        const accountType = result(item, 'accountType', '');
        return includes(item.subscriberNo, searchFilter) || includes(billerName, searchFilter) || includes(accountName.toUpperCase(), searchFilter.toUpperCase()) || includes(accountNumber, searchFilter) || includes(accountBank.toUpperCase(), searchFilter.toUpperCase()) || includes(accountType, searchFilter) || includes(description, searchFilter);
      } else {
        const biller = find(billerList, (biller) => biller.id === item.billerId); // tidak ada isi = null
        const billerName = result(biller, 'name', '');
        const accountName = result(item, 'name', '');
        const accountNumber = result(item, 'accountNumber', '');
        const accountBank = result(item, 'bankName', '');
        const accountType = result(item, 'accountType', '');
        const description = result(item, 'description', '');
        return includes(item.subscriberNo, searchFilter) || includes(billerName, searchFilter) || includes(accountName.toUpperCase(), searchFilter.toUpperCase()) || includes(accountNumber, searchFilter) || includes(accountBank.toUpperCase(), searchFilter.toUpperCase()) || includes(accountType, searchFilter) || includes(description, searchFilter);
      }
    });
    const historyData = [...historyTrf, ...historyBiller];
    return (
      <View style={styles.containerUtama}>
        <ScrollView style={styles.flexGrey}>
          <View style={styles.backgroundColorPink}/>
          <View style={styles.topBg}>
            <View style={styles.scan}>
              <Touchable onPress={goBack}>
                <SimasIcon name={'chevron'} size={25} style={styles.backButton}/>
              </Touchable>
              <Text style={styles.textScan}>{language.FAVORITE_TRANSACTION}</Text>
            </View>
          </View>
          <View style={styles.containerBannerWhite}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120}>
              <Overlay closeOnTouchOutside={this.state.newBiller || this.state.newBank ? null : closeOnTouchOutside} visible={this.state.visible} onClose={this.onClose}>
                <ScrollView keyboardShouldPersistTaps='handled' bounces={false} >
                  { this.state.newBiller === true ?
                    <View>
                      <Text style={styles.headingFav}>{language.FAVORITE_MERCHANT}</Text>
                      <View style={styles.searchInput}>
                        <Text style={styles.label}>{language.FAVORITE__BILLER_NAME}</Text>
                        <Field
                          name='billerList'
                          rightIcon='arrow'
                          component={SinarmasPickerLine}
                          placeholder={language.SELECT_BILLER}
                          labelKey='name'
                          itemList={billerList}
                        />
                      </View>
                      <View style={styles.searchInput}>
                        <Field
                          name='description'
                          label={language.HINTTEXT__ALIAS}
                          placeholder={language.HINTTEXT__ALIAS}
                          format={formatFieldNote}
                          normalize={formatFieldNote}
                          component={SinarmasInput}
                          maxLength={16}
                        />
                      </View>
                      <View style={styles.searchInput}>
                        <Field
                          name='phone'
                          label={language.FAVORITE__SUBSCRIBER_NUMBER}
                          placeholder={language.FAVORITE__SUBSCRIBER_NUMBER}
                          format={formatFieldAccount}
                          normalize={formatFieldAccount}
                          component={SinarmasInput}
                          keyboardType='phone-pad'
                        />
                      </View>
                      <View style={[styles.historyItemRow, styles.buttonStyle]}>
                        <Touchable onPress={this.onClose}>
                          <Text style={styles.cancel}>{language.FAVORITE__CANCEL_BUTTON}</Text>
                        </Touchable>
                        <Touchable onPress={this.saveToFavorite}>
                          <Text style={styles.save}>{language.GENERIC__SAVE}</Text>
                        </Touchable>
                      </View>
                    </View>
                    : this.state.newBank === true ?
                      <View>
                        <Text style={styles.headingFav}>{language.FAVORITE_BANK}</Text>
                        <View style={styles.searchInput}>
                          <Field
                            name='payeeAccNo'
                            label={language.TRANSFER__PAYEE_ACCOUNT_NUMBER}
                            placeholder={language.HINTTEXT__PAYEE_ACCOUNT_NUMBER}
                            component={SinarmasInput}
                            keyboardType='numeric'
                            format={formatFieldAccount}
                            normalize={formatFieldAccount}
                          />
                        </View>
                        <View style={styles.searchInput2}>
                          <Text style={styles.label}>{language.TRANSFER__BANK_OR_CODE}</Text>
                          <Field
                            name='bank'
                            rightIcon='arrow'
                            component={SinarmasPicker}
                            placeholder={language.TITLE__SELECT_BANK}
                            labelKey='bankName'
                            itemList={bankList}
                            onValChange={goToAddPayee}
                            disabled={!payeeAccNo}
                          />
                        </View>
                        <View style={styles.searchInput}>
                          <Field
                            name='payeeName'
                            label={language.TRANSFER__NAME}
                            placeholder={language.HINTTEXT__PAYEE_NAME}
                            normalize={formatPayeeName(originalName)}
                            component={SinarmasInput}
                          />
                        </View>
                        <View style={styles.searchInput}>
                          <Field
                            name='description'
                            label={language.HINTTEXT__ALIAS}
                            placeholder={language.HINTTEXT__ALIAS}
                            format={formatFieldNote}
                            normalize={formatFieldNote}
                            component={SinarmasInput}
                            maxLength={16}
                          />
                        </View>
                        <View style={[styles.historyItemRow, styles.buttonStyle]}>
                          <Touchable onPress={this.onClose}>
                            <Text style={styles.cancel}>{language.FAVORITE__CANCEL_BUTTON}</Text>
                          </Touchable>
                          <Touchable onPress={this.saveToFavoriteBank}>
                            <Text style={styles.save}>{language.GENERIC__SAVE}</Text>
                          </Touchable>
                        </View>
                      </View>
                      :
                      <View style={styles.chooseFav}>
                        { filterData === 'trf' ?
                          <Touchable onPress={this.goNewBank} style={styles.chooseFavText}>
                            <Text style={styles.chooseText}>{language.FAVORITE_BANK}</Text>
                          </Touchable>
                          : filterData === 'biller' ?
                            <Touchable onPress={this.goNewBiller} style={styles.chooseFavText}>
                              <Text style={styles.chooseText}>{language.FAVORITE_BILLER}</Text>
                            </Touchable>
                            :
                            <View>
                              <Touchable onPress={this.goNewBank} style={styles.chooseFavText}>
                                <Text style={styles.chooseText}>{language.FAVORITE_BANK}</Text>
                              </Touchable>
                              <View style={styles.greyLine} />
                              <Touchable onPress={this.goNewBiller} style={styles.chooseFavText}>
                                <Text style={styles.chooseText}>{language.FAVORITE_BILLER}</Text>
                              </Touchable>
                            </View>
                        }
                      </View>
                  }
                </ScrollView>
              </Overlay>
              <View style={styles.filterBox}>
                <TextInput underlineColorAndroid='transparent' onChangeText={this.filterChange}
                  value={this.state.searchFilter} maxLength={20} placeholder={filterData === 'trf' ? language.FAVORITE_SEARCH_BOX_TRF : filterData === 'biller' ? language.FAVORITE_SEARCH_BOX_BILLER : language.FAVORITE_SEARCH_BOX}
                  style={styles.filterTextInput}/>
                <View style={styles.iconStyle}>
                  <SimasIcon name='magnifier' style={styles.searchIcon} size={20}/>
                </View>
              </View>
              {
                status === 'loading' ?
                  <View style={styles.activityContainer}>
                    <ActivityIndicator size='large'/>
                  </View>
                  : status === 'error' ?
                    <Touchable onPress={reloadHistory} style={styles.activityContainer}>
                      <Text style={styles.errorText}>
                        {language.FAVORITE_ERROR}
                        <Text style={styles.reloadText}>{language.PAY_BILLS__HISTORY_RELOAD}</Text>
                      </Text>
                    </Touchable>
                    : !isEmpty(history) ?
                      <View>
                        { filterData === 'trf' && isEmpty(historyTrf) ?
                          <View style={styles.activityContainer}>
                            <Text style={styles.errorText}>
                              {language.PAY_BILLS__HISTORY_NOTHING}
                            </Text>
                          </View>
                          : filterData === 'biller' && isEmpty(historyBiller) ?
                            <View style={styles.activityContainer}>
                              <Text style={styles.errorText}>
                                {language.PAY_BILLS__HISTORY_NOTHING}
                              </Text>
                            </View>
                            :
                            <View style={styles.swipeRow}>
                              <FlatList enableEmptySections data={filterData === 'biller' ? historyBiller : filterData === 'trf' ? historyTrf : historyData} renderItem={this.renderBillerList}/>
                            </View>
                        }
                      </View>
                      :
                      <View style={styles.activityContainer}>
                        <Text style={styles.errorText}>
                          {language.PAY_BILLS__HISTORY_NOTHING}
                        </Text>
                      </View>
              }
            </KeyboardAwareScrollView>   
          </View>
        </ScrollView>
        <View style={styles.buttonBottomSplitBill}>
          <SinarmasButton text={language.ADD_NEW_SET_LIMIT} onPress={this.showFavorite}/>
        </View>
      </View>   
    );
  }
}

export default FavoriteBiller;
