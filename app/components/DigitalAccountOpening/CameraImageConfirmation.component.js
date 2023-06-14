import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import styles from './DigitalEForm.styles';
import {Dimensions} from 'react-native';
import {noop, result} from 'lodash';

class CameraImageConfirmation extends Component {

  render () {
    const {base64Image, backToCamera, imageRotate, navigation, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const renderImage = `data:image/gif;base64,${base64Image}`;
    const {width} = Dimensions.get('window');
    const trueWidth = width - 40;
    const trueHeight = (trueWidth * 14) / 15;
    const dtOpening = result(navigation, 'state.params.dtOpening', '');
    
    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View style={styles.missingInfoContainer}>
          <View style={styles.mainTitleConf}>
            <Text style={styles.mainTitleText}>{language.CREDITCARD_UPLOAD_PHOTO}</Text>
          </View>
      
          <View style={styles.imageContainer}>
            <Image source={{uri: renderImage}} style={{width: trueWidth, height: trueHeight, transform: [{rotate: imageRotate}]}}/>
          </View>

          <View style={styles.missingInfoBottomWrapper}>
            <View style={styles.buttonNextConf}>
              <View style={styles.photoTextContainer}>
                <Touchable onPress={backToCamera}>
                  <Text style={styles.photoText}>{language.CREDITCARD_TAKE_PHOTO}</Text>
                </Touchable>
              </View>
              <SinarmasButton dtActionName={dtOpening} onPress={handleSubmit} disabled={invalid || submitting}>
                <Text style={styles.buttonLargeTextStyle}>{language.EMONEY__UPGRADE_UPLOAD}</Text>
              </SinarmasButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

CameraImageConfirmation.propTypes = {
  base64Image: PropTypes.string,
  handleSubmit: PropTypes.func,
  backToCamera: PropTypes.func,
  imageRotate: PropTypes.string,
  navigation: PropTypes.object
};

export default CameraImageConfirmation;
