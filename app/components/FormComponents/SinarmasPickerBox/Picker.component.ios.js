import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, PickerIOS} from 'react-native';
import Overlay from '../../Overlay/Overlay.component';
import styles from './Picker.component.styles';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import indexOf from 'lodash/indexOf';
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

  renderItem = (option, i) => (
    <PickerItemIOS
      key={`option${i}`}
      value={option}
      label={option}
    />
  )

  renderItemRevamp = (option, i) => (
    <PickerItemIOS
      key={`option${i}`}
      value={option.schmeId}
      label={option.term}
    />
  )

  render () {
    const itemStyle = this.props.itemStyle || {};
    const {options, confirmText, selectedValue, onSelect, modalVisible, showModal, hideModal, arrowPickerStyle = {}, textPickerStyle = {}, isRevamp = false, selectedValueName, isBiller, billerNameDt} = this.props;
    const dtActionGlobal = isBiller ? billerNameDt + ' - ' + 'Select Amount' : isRevamp ? selectedValueName : selectedValue;
    return (
      <View>
        <Touchable dtActionName = {dtActionGlobal} style={styles.textBoxStyle} onPress={showModal}>
          <Text style={[styles.textStyle, textPickerStyle]}>
            {isRevamp ? selectedValueName : selectedValue}
          </Text>
          <SimasIcon name='arrow' style={[styles.arrowDownStyle, arrowPickerStyle]} />
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
              <Touchable onPress={hideModal}>
                <Text style={styles.buttonStyle}>
                  {confirmText || language.SINARMAS_PICKER__DONE}
                </Text>
              </Touchable>
            </View>

            <View>
              <PickerIOS style={styles.bottomPicker} selectedValue={selectedValue} onValueChange={onSelect} itemStyle={itemStyle}>
                {options.map(isRevamp ? this.renderItemRevamp : this.renderItem)}
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
  isRevamp: PropTypes.bool,
  labelText: PropTypes.string,
  selectedValueName: PropTypes.string,
  isBiller: PropTypes.bool,
  billerNameDt: PropTypes.string
};

export default Picker;
