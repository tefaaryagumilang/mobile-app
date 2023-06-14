import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {RadioButtons} from 'react-native-radio-buttons';
import styles from './CheckBoxButtonNew.styles';
import Touchable from '../../Touchable.component';
import noop from 'lodash/noop';
import WebView from 'react-native-webview';

class RadioButton extends Component {
  static propTypes = {
    options: PropTypes.array,
    input: PropTypes.object,
    onPressRadioButton: PropTypes.func,
    warningText: PropTypes.string,
    renderContainer: PropTypes.object,
    renderRow: PropTypes.bool,
  };

  static defaultProps = {
    options: [], // option = [{label: '', value: ''}, ...]
    input: {
      onChange: noop,
    }
  };

  setSelectedOption = (selectedOption, option) =>
    option.value === this.props.input.value.value;

  renderOption = (option, selected, onSelect, index) => {
    const {onPressRadioButton = noop, warningText = ''} = this.props;
    return (
      <Touchable onPress={onSelect} key={index}>
        <View>
          <View style={styles.optionStyle}>
            <View style={styles.buttonStyle}>
              {selected && <View style={styles.buttonActive} />}
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.textStyle} onPress={onPressRadioButton}>
                {option.label}
              </Text>
              <Text style={styles.textStyle}>{option.sublabel}</Text>
            </View>
          </View>
          {warningText !== '' && (
            <View style={styles.webViewContainer}>
              <WebView
                style={styles.webViewStyle}
                source={{html: warningText}}
              />
            </View>
          )}
        </View>
      </Touchable>
    );
  };

  renderOptionRow = (option, selected, onSelect, index) => {
    const {onPressRadioButton = noop, warningText = ''} = this.props;
    return (
      <View style={styles.halfWidth}>
        <Touchable onPress={onSelect} key={index}>
          <View>
            <View style={styles.optionStyle}>
              <View style={styles.buttonStyle}>
                {selected && <View style={styles.buttonActive} />}
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.textStyle} onPress={onPressRadioButton}>
                  {option.label}
                </Text>
                <Text style={styles.textStyle}>{option.sublabel}</Text>
              </View>
            </View>
            {warningText !== '' && (
              <View style={styles.webViewContainer}>
                <WebView
                  style={styles.webViewStyle}
                  source={{html: warningText}}
                />
              </View>
            )}
          </View>
        </Touchable>
      </View>
    );
  };

  renderContainer = (optionNodes) => <View>{optionNodes}</View>;

  renderContainerRow = (optionNodes) => (
    <View style={styles.renderContainerRow}>{optionNodes}</View>
  );

  render () {
    const {options, input, renderRow = false} = this.props;
    return (
      <RadioButtons
        options={options}
        onSelection={input.onChange}
        selectedOption={input.value}
        renderOption={renderRow ? this.renderOptionRow : this.renderOption}
        renderContainer={
          renderRow ? this.renderContainerRow : this.renderContainer
        }
        testOptionEqual={this.setSelectedOption}
      />
    );
  }
}

export default RadioButton;
