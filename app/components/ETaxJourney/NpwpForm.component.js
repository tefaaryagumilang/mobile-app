import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './NpwpForm.styles';
import {SinarmasInputBoxNew, SinarmasPickerBoxNew} from '../FormComponents';
import {formatNpwp, formatNOP, formatFieldAmount, normalizeAmount, getTaxList, getJenisPajak, etaxMonthRange} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import {result, isEmpty} from 'lodash';
import * as Utils from '../../utils/transformer.util';
import ErrorTextIndicator from '../ErrorTextIndicator/ErrorTextIndicator.component';

class IdBillingFormOne extends React.Component {
  static propTypes = {
    jenisPajak: PropTypes.array,
    jenisSetoran: PropTypes.array,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    getTypeSetoran: PropTypes.func,
    biller: PropTypes.object,
    yearList: PropTypes.array,
    lang: PropTypes.string,
    changeValue: PropTypes.func,
    haveNpwp: PropTypes.bool
  }

  state = {
    npwpVal: '',
    startDate: 0,
    endDate: 0,
    checkRange: false
  }

  getTipeSetoran = (data) => {
    const {getTypeSetoran, haveNpwp} = this.props;
    const taxCode = result(data, 'code', '');
    !isEmpty(data) && getTypeSetoran(taxCode, haveNpwp);
  }

  changeStartValue = (startVal) => {
    const {changeValue} = this.props;
    const {endDate} = this.state;
    const dateCodeStart = result(startVal, 'number', 0);
    this.setState({startDate: dateCodeStart});
    const dateCodeEnd = endDate;
    if (dateCodeStart > dateCodeEnd) {
      this.setState({checkRange: true});
      changeValue(true);
    } else {
      this.setState({checkRange: false});
      changeValue(false);
    }
  }

  changeEndValue = (startVal) => {
    const {changeValue} = this.props;
    const {startDate} = this.state;
    const dateCodeEnd = result(startVal, 'number', 0);
    this.setState({endDate: dateCodeEnd});
    const dateCodeStart = startDate;
    if (dateCodeStart > dateCodeEnd) {
      this.setState({checkRange: true});
      changeValue(true);
    } else {
      this.setState({checkRange: false});
      changeValue(false);
    }
  }

  render () {
    const {jenisPajak, jenisSetoran, formValues, yearList, lang} = this.props;
    const {checkRange, endDate, startDate} = this.state;
    const transformJenisPajak = getJenisPajak(jenisPajak);
    const transformJeniSetoran = getJenisPajak(jenisSetoran);
    const listYear = getTaxList(yearList);
    const monthRange = etaxMonthRange(lang);
    const transformRange = getTaxList(monthRange);
    const monthValidation = startDate !== 0 && endDate !== 0;
    return (
      <View>

        <View style={styles.mt10}>
          <Field
            name={'npwp'}
            component={SinarmasInputBoxNew}
            label={language.ETAX__FORM_ONE_NPWP}
            isTax={true}
            KeyboardType={'numeric'}
            format={isEmpty(result(formValues, 'npwp', '')) ? '' : formatNpwp}
            maxLength={20}
          />
        </View>
        <View style={styles.mt10}>
          <Field
            name={'nop'}
            component={SinarmasInputBoxNew}
            label={'NOP'}
            isTax={true}
            KeyboardType={'numeric'}
            format={isEmpty(result(formValues, 'nop', '')) ? '' : formatNOP}
          />
        </View>
        <View style={styles.mt15}>
          <Field
            name='jenisPajak'
            component={SinarmasPickerBoxNew}
            itemList={transformJenisPajak}
            isTax={true}
            rightIcon='arrow'
            placeholder={language.ETAX__FORM_ONE_TAX_TYPE}
            labelText={language.ETAX__FORM_ONE_TAX_TYPE}
            labelKey='display'
            textPickerStyle={styles.textPickerStyle}
            pickerStyle={styles.pickerStyle}
            onValChange={this.getTipeSetoran}
          />
        </View>
        <View style={styles.mt15}>
          <Field
            name='jenisSetoran'
            component={SinarmasPickerBoxNew}
            itemList={transformJeniSetoran}
            isTax={true}
            rightIcon='arrow'
            placeholder={language.ETAX_TAXPAYER_DEPOSITTYPE_HINT}
            labelText={language.ETAX_TAXPAYER_DEPOSITTYPE_HINT}
            labelKey='display'
            textPickerStyle={styles.textPickerStyle}
            pickerStyle={styles.pickerStyle}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>{language.ETAX_TAX_PERIOD_SUB}</Text>
          <View style={styles.dateContainer}>
            <View style={styles.h10Left}>
              <Field
                name='dateStart'
                component={SinarmasPickerBoxNew}
                itemList={transformRange}
                isTax={true}
                rightIcon='arrow'
                placeholder={language.DETAIL_TRANSACTION__FROM}
                labelText={language.DETAIL_TRANSACTION__FROM}
                labelKey='display'
                textPickerStyle={styles.textPickerStyle}
                pickerStyle={styles.pickerStyle}
                onValChange={this.changeStartValue}
              />
            </View>
            <View style={styles.h10Right}>
              <Field
                name='dateEnd'
                component={SinarmasPickerBoxNew}
                itemList={transformRange}
                isTax={true}
                rightIcon='arrow'
                placeholder={language.DETAIL_TRANSACTION__TO}
                labelText={language.DETAIL_TRANSACTION__TO}
                labelKey='display'
                textPickerStyle={styles.textPickerStyle}
                pickerStyle={styles.pickerStyle}
                onValChange={this.changeEndValue}
              />
            </View>
          </View>
          {monthValidation && checkRange &&
          <View style={styles.errorRange}>
            <ErrorTextIndicator text={language.ETAX__FORM_DATE_ERROR} isTax={true}/>
          </View>}
        </View>
        <View style={styles.mt30}>
          <View style={styles.mt10}>
            <Field
              name='tahunPajak'
              component={SinarmasPickerBoxNew}
              itemList={listYear}
              isTax={true}
              rightIcon='arrow'
              placeholder={language.ETAX_TAX_YEAR_PICKER}
              labelText={language.ETAX_TAX_YEAR_PICKER}
              labelKey='display'
              textPickerStyle={styles.textPickerStyle}
              pickerStyle={styles.pickerStyle}
            />
          </View>
        </View>
        <View style={styles.mt10}>
          <Field
            name={'jumlahSetor'}
            component={SinarmasInputBoxNew}
            label={language.ETAX_TAX_DEPOSIT_AMOUNT}
            isTax={true}
            KeyboardType={'numeric'}
            format={formatFieldAmount}
            normalize={normalizeAmount}
          />
        </View>
        <View style={styles.mt10}>
          <Field
            name={'berita'}
            component={SinarmasInputBoxNew}
            label={language.TRANSFER__NOTES}
            isTax={true}
            maxLength={50}
            format={Utils.formatFieldNote}
            normalize={Utils.formatFieldNote}
          />
        </View>
      </View>
    );
  }
}

export default IdBillingFormOne;