import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './DigitalEForm.styles';
import {result} from 'lodash';
  
class DigitalEFormSuccessScreen extends React.Component {
  static propTypes = {
    backToHome: PropTypes.func,
    data: PropTypes.object,
    currentLanguage: PropTypes.string,
    navigation: PropTypes.object
  }
  
  render () {
    const {backToHome, data, currentLanguage, navigation} = this.props;
    const image = result(data, 'image', '');
    const titleID = result(data, 'titleID', '');
    const titleEN = result(data, 'titleEN', '');
    const subtitleID = result(data, 'subTitleID', '');
    const subtitleEN = result(data, 'subTitleEN', '');
    const productName = result(navigation, 'state.params.productData.productNameEN', '').includes('Digi');
    const productCode = result(navigation, 'state.params.productData.productCode', '');
    const dtOpening = productCode === 'SADG' ? 'Open Simas Digi Saving - ' : productName && productCode === 'UCCXV' ? 'Open Credit Card and Simas Digi Saving - ' : '';

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.successContainer}>
          <Image source={{uri: image}} style={styles.successImage}/>
          <View style={styles.successContent}>
            <Text style={styles.successText}>{currentLanguage === 'id' ? titleID : titleEN}</Text>
            <Text style={styles.successSubText}>{currentLanguage === 'id' ? subtitleID : subtitleEN}</Text>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <SinarmasButton dtActionName={dtOpening + language.LOAN__TRACK_BUTTON} onPress={backToHome}>
            <Text style={styles.buttonLargeTextStyle}>{language.LOAN__TRACK_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default DigitalEFormSuccessScreen;
