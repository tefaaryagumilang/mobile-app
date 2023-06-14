import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import {RNCamera} from 'react-native-camera';
import styles from './DigitalEForm.styles';
import {Toast} from '../../utils/RNHelpers.util';
import tracker from '../../utils/googleAnalytics.util';
import {connect} from 'react-redux';
import {generatePhoto} from '../../state/thunks/digitalAccountOpening.thunks';
import {filter, result} from 'lodash';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';

class DigitalEFormSelfieCamera extends Component {
  static propTypes = {
    setImage: PropTypes.func,
    page: PropTypes.object, 
    pageName: PropTypes.string, 
    formid: PropTypes.string,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
    navigation: PropTypes.object
  }

  cameraCapture = (cam) => {
    this.camera = cam;
  };

  takePicture = (fieldName, pageName) => {
    const {setImage, navigation, page} = this.props;
    const options = {quality: 0.1, base64: true, fixOrientation: true, forceUpOrientation: true};

    // Dynatarce
    const {header} = page;
    const productName = result(navigation, 'state.params.productData.productNameEN', '').includes('Digi');
    const productCode = result(navigation, 'state.params.productData.productCode', '');
    const isSelID = header === 'CAMERA__SELFIE_WITH_KTP';
    const dtCC = isSelID ? 'Open Credit Card and Simas Digi Saving - Upload Photo Selfie + KTP' : 'Open Credit Card and Simas Digi Saving - Liveness Check - Continue';
    const dtOpening = productCode === 'SADG' ? 'Open Simas Digi Saving - Liveness Check - Continue' : productName && productCode === 'UCCXV' ? dtCC : '';
    
    this.props.showSpinner();
    this.camera.takePictureAsync(options).
      then((data) => {
        this.props.hideSpinner();
        tracker.trackEvent('CAMERA_CAPTURE', 'CAMERA_CAPTURE_SUCCESS', null, {});
        setImage(fieldName, pageName, data, dtOpening);
      }).catch(() => {
        this.props.hideSpinner();
        tracker.trackEvent('CAMERA_CAPTURE', 'CAMERA_CAPTURE_FAILED', null, {});
        Toast.show(language.ERROR_MESSAGE__COULD_NOT_TAKE_PICTURE, Toast.LONG);
      });
  }

  render () {
    const {page, pageName, navigation} = this.props;
    const {fields, header, footer} = page;
    const field = filter(fields, (obj) => obj.component === 'selfieCamera')[0] || fields[0]; // fields that uses camera or the first field if none specified
    const {code: fieldName, ...otherProps} = field;
    !fieldName && alert('no camera fields');

    const productName = result(navigation, 'state.params.productData.productNameEN', '').includes('Digi');
    const productCode = result(navigation, 'state.params.productData.productCode', '');
    const dtOpening = productCode === 'SADG' ? 'Open Simas Digi Saving - ' : productName && productCode === 'UCCXV' ? 'Open Credit Card and Simas Digi Saving - ' : '';
    const isSelID = header === 'CAMERA__SELFIE_WITH_KTP';

    return (
      <View style={styles.cameraContainer}>
        <RNCamera
          {...otherProps}
          ref={this.cameraCapture}
          style={styles.preview}
          captureAudio={false}
          type={RNCamera.Constants.Type.front}
        >
          <View style={styles.cameraInfo}>
            {
              !!header && 
              <View style={styles.sideContainerSelfie}>
                <Text style={styles.normalText}>
                  {language[header]}
                </Text>
              </View>
            }
            <View style={styles.capture}>
              {
                !!footer &&
                <View style={styles.mb20}>
                  <Text style={styles.footerText}>
                    {language[footer]}
                  </Text>
                </View>
              }
              <SinarmasButton dtActionName={isSelID ? dtOpening + 'Photo Selfie + KTP' : dtOpening + 'Liveness Check'} onPress={wrapMethodInFunction(this.takePicture, fieldName, pageName)} text={language.CAMERA__TAKE_PHOTO} />
            </View>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const cameraState = () => ({});

const cameraDispatch = (dispatch) => ({
  setImage: (fieldName, pageName, data, dtOpening) => {
    const nextFunction = () => dispatch(generatePhoto(fieldName, pageName, data));
    dispatch(NavigationActions.navigate({routeName: 'CameraImageConfirmation', params: {data: data.base64, code: data.pictureOrientation, nextFunction, dtOpening}}));
  },
  showSpinner: () => {
    dispatch(showSpinner());
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  }
});

const ConnectedEFormCamera = connect(cameraState, cameraDispatch)(DigitalEFormSelfieCamera);

export default ConnectedEFormCamera;


