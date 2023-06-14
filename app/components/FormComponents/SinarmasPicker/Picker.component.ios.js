import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, PickerIOS} from 'react-native';
import Overlay from '../../Overlay/Overlay.component';
import styles from './Picker.component.styles';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import {indexOf, noop} from 'lodash';
import {language} from '../../../config/language';
import Touchable from '../../Touchable.component';

const PickerItemIOS = PickerIOS.Item;

class Picker extends Component {

  onPressNext = () => {
    const {options, selectedValue, onSelect} = this.props;
    const maxIndex = options.length - 1;
    const selectedIndex = selectedValue ? indexOf(options, selectedValue) : 0;
    if (selectedIndex < maxIndex) {
      onSelect(options[selectedIndex + 1]);
    }
  }

  onPressPrevious = () => {
    const {options, selectedValue, onSelect} = this.props;
    const selectedIndex = indexOf(options, selectedValue);
    if (selectedIndex > 0) {
      onSelect(options[selectedIndex - 1]);
    }
  }

  onSelect = () => {
    const {onSelectPress = noop, hideModal} = this.props;
    onSelectPress();
    hideModal();
  }

  renderItem = (option, i) => (
    <PickerItemIOS
      key={`option${i}`}
      value={option}
      label={option}
    />
  )

  render () {
    const itemStyle = this.props.itemStyle || {};
    const {options, confirmText, selectedValue, onSelect, modalVisible, showModal, arrowPickerStyle = {}, textPickerStyle = {}, disabled = false, dynatrace = '', dynatraceItem = ''} = this.props;
    return (
      <View>
        <Touchable dtActionName={dynatrace} style={styles.textBoxStyle} onPress={showModal} disabled={disabled}>
          <Text style={[styles.textStyle, textPickerStyle]}>
            {selectedValue}
          </Text>
          <SimasIcon name='arrow' style={disabled ? [styles.arrowDownStyleDisabled, arrowPickerStyle] : [styles.arrowDownStyle, arrowPickerStyle]} />
        </Touchable>

        <Overlay visible={modalVisible} containerStyles={styles.overlayContainer} innerContainerStyles={styles.innerOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.buttonContainer}>
              <View style={styles.arrowContainer}>
                <Touchable style={styles.paddingRight} onPress={this.onPressPrevious}>
                  <SimasIcon name='arrow' size={20} style={styles.leftArrow} />
                </Touchable>
                <Touchable style={styles.paddingLeft} onPress={this.onPressNext}>
                  <SimasIcon name='arrow' size={20} style={styles.rightArrow} />
                </Touchable>
              </View>
              <Touchable dtActonName ={dynatraceItem} onPress={this.onSelect}>
                <Text style={styles.buttonStyle}>
                  {confirmText || language.SINARMAS_PICKER__DONE}
                </Text>
              </Touchable>
            </View>

            <View>
              <PickerIOS style={styles.bottomPicker} selectedValue={selectedValue} onValueChange={onSelect} itemStyle={itemStyle}>
                {options.map(this.renderItem)}
              </PickerIOS>
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.array.isRequired,
  confirmText: PropTypes.string,
  selectedValue: PropTypes.string,
  itemStyle: PropTypes.object,
  onSelect: PropTypes.func,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  modalVisible: PropTypes.bool,
  arrowPickerStyle: PropTypes.object,
  textPickerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  onSelectPress: PropTypes.func,
  dynatrace: PropTypes.string,
  dynatraceItem: PropTypes.string
};

export default Picker;
