import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasIconInput, SinarmasButton, DatePicker, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './SavingAccount.style';
import {noop} from 'lodash';
import ErrorTextIndicator from '../ErrorTextIndicator/ErrorTextIndicator.component';
import {normalizeNumber, formatFieldNote} from '../../utils/transformer.util';

export const fields = {
  KTP_NUMBER: 'ktpId',
  MARITAL_STATUS: 'maritalStatus',
  BIRTH_DATE: 'birthDate',
  MOTHERS_MAIDEN: 'mothersMaiden',
};

class SavingAccountForm1 extends Component {

  render () {
    const {validationInput, err, maritalStatusList, disabled, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const maxDate = new Date();

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer} >
          <View style={styles.progressBar}>
            <View style={[{flex: 1}, styles.redBar]}/>
            <View style={[{flex: 9}, styles.greyBar]}/>
          </View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.CREDITCARD__TITLE1}</Text>
          </View>

          <View style={styles.FieldsContainerWrapper}>
            <Field
              name={fields.KTP_NUMBER}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.CREDITCARD__KTP_NUMBER}
              placeholder={language.HINT__KTP_NUMBER}
              isUseSuccessInputText={true}
              keyboardType='numeric'
              maxLength={16}
              typeField={'ktpId'}
              normalize={normalizeNumber}
              format={formatFieldNote}
              validationInput={validationInput}
            />
            <Field
              name={fields.MARITAL_STATUS}
              component={SinarmasPicker}
              style={styles.fieldContainer}
              placeholder={language.CREDITCARD__MARITAL_STATUS}
              typeField={'maritalStatus'}
              labelKey='name'
              itemList={maritalStatusList}
              validationInput={validationInput}
            />
            <Field
              name={fields.BIRTH_DATE}
              component={DatePicker}
              label={language.CREDITCARD__BIRTH_DATE}
              placeholder={language.HINTTEXT__BIRTH_DATE}
              maximumDate={maxDate}
              minimumDate={'01/01/1900'}
              date={maxDate}     
            />
            {err === '' ? null : <ErrorTextIndicator text={err}/>}
            <Field
              name={fields.MOTHERS_MAIDEN}
              component={SinarmasIconInput}
              label={language.CREDITCARD__MOTHERS_MAIDEN}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.HINTTEXT__MOTHERS_MAIDEN}
              isUseSuccessInputText={true}
              typeField={'mothersMaiden'}
              validationInput={validationInput}
              normalize={formatFieldNote}
              format={formatFieldNote}
            />
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting || disabled} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

SavingAccountForm1.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  err: PropTypes.string,
  maritalStatusList: PropTypes.array,
  disabled: PropTypes.bool,
};

export default SavingAccountForm1;
