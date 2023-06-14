import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, TextInput, Text} from 'react-native';
import noop from 'lodash/noop';
import styles from './SinarmasInputBoxRevamp.styles';
import ErrorTextIndicator from '../../ErrorTextIndicator/ErrorTextIndicator.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import SimasIcon from '../../../assets/fonts/SimasIcon';


class SinarmasInputBoxRevamp extends Component {
  _inputRef = null
  _setRef = (ref) => {
    this._inputRef = ref; // ref is required to access the target value in case of onblur and onfocus
  }

  state = {
    isFocused: false,
    isSuccessInputText: false
  }

  componentWillReceiveProps (nextProps) {
    this._inputRef._lastNativeText = nextProps.input && nextProps.input.value;
  }

  componentWillMount () {
    const value = result(this.props, 'input.value', '');
    if (!isEmpty(value)) {
      this._animatedIsFocused = new Animated.Value(1);
    } else {
      this._animatedIsFocused = new Animated.Value(0);
    }
  }

  componentDidUpdate () {
    const lastNativeTextValue = result(this._inputRef, '_lastNativeText', '');
    const inputLastNativeText = result(this._inputRef, 'input._lastNativeText', '');
    const value = result(this._inputRef, 'props.value', '');
    let focused = false;
    if (!isEmpty(lastNativeTextValue) || !isEmpty(inputLastNativeText) || this.state.isFocused || !isEmpty(value)) {
      focused = true;
    }
    Animated.timing(this._animatedIsFocused, {
      toValue: focused ? 1 : 0,
      duration: 200,
    }).start();
  }

  // used _lastNativeText because android doesnt pass targetEvent in onBlur and onFocus
  _onBlurHandler = (inputProps) => () => {
    const {onBlur, onInputChange} = inputProps;
    const val = this._inputRef._lastNativeText;
    onBlur(val);
    onInputChange(val);
    if (!isEmpty(val)) {
      this.setState({isFocused: true});
    } else {
      this.setState({isFocused: false});
    }
  }

  _onFocusHandler = (inputProps) => () => {
    const {onFocus, onInputChange} = inputProps;
    const val = this._inputRef._lastNativeText;
    onFocus(val);
    onInputChange(val);
    this.setState({isFocused: true});
  }

  _onChangeTextHandler = (inputProps) => (val) => {
    const {onChange, onInputChange, isUseSuccessInputText, validationInput} = inputProps;
    onChange(val);
    onInputChange(val);
    if (isUseSuccessInputText && !isEmpty(val)) {
      const isValid = validationInput(inputProps, val);
      if (isValid) {
        this.setState({isSuccessInputText: true});
      } else {
        this.setState({isSuccessInputText: false});
      }
    } else {
      this.setState({isSuccessInputText: false});
    }
  }

  render () {
    const {isInputAmount, meta, input = {}, value, onFocus = noop, onBlur = noop, onChangeText = noop, onInputChange = noop, disabled = false, placeholder = '', isUseSuccessInputText = false, typeField = 'text', setNewUsernameValue, setNewPasswordValue, usernameValue = '', passwordValue = '', oldPassword = '', validationInput, iconName = '', leftIcon = '', textPosition = '', label = '', isSwiftCode, ...extraProps} = this.props;
    const err = !disabled && (meta && meta.touched && !meta.active && meta.error);

    const onChange = onChangeText;

    const inputProps = {onChange, onFocus, onBlur, onInputChange, value, isUseSuccessInputText, typeField, setNewUsernameValue, usernameValue, setNewPasswordValue, passwordValue, oldPassword, validationInput, ...input};
    const textInput = disabled && !isInputAmount ? styles.inputStyleDisabledCenter : isInputAmount ? styles.inputAmount : disabled && isInputAmount ? styles.inputAmount : isSwiftCode ? styles.inputStyleCenterSwift : styles.inputStyleCenter;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [35, 10],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 12],
      })
    };
    return (
      <View>
        <View>
          <View>
            <Animated.Text style={labelStyle}>
              {label}
            </Animated.Text>
          </View>
          <Text style={[styles.text, styles.ml5]}>{leftIcon}</Text>
          { textPosition === 'center' ?
            <TextInput
              {...extraProps}
              value={inputProps.value}
              textColor={disabled ? styles.tintColor.disabled : undefined}
              ref={this._setRef}
              style={textInput}
              onChangeText={this._onChangeTextHandler(inputProps)}
              onFocus={this._onFocusHandler(inputProps)}
              onBlur={this._onBlurHandler(inputProps, input.value)}
              baseColor={disabled ? styles.tintColor.disabled : undefined}
              editable={!disabled}
              tintColor={disabled ? styles.tintColor.disabled : styles.tintColor.textInput}
              label={''}
              placeholder={this.state.isFocused && isEmpty(value) ? placeholder : ''}
              autoCapitalize={'none'}
              disabled={disabled}
              disabledLineType={'solid'}
            />
            :
            <TextInput
              {...extraProps}
              value={inputProps.value}
              textColor={disabled ? styles.tintColor.disabled : undefined}
              ref={this._setRef}
              style={textInput}
              onChangeText={this._onChangeTextHandler(inputProps)}
              onFocus={this._onFocusHandler(inputProps)}
              onBlur={this._onBlurHandler(inputProps, input.value)}
              baseColor={disabled ? styles.tintColor.disabled : undefined}
              editable={!disabled}
              tintColor={disabled ? styles.tintColor.disabled : styles.tintColor.textInput}
              label={''}
              placeholder={this.state.isFocused && isEmpty(value) ? placeholder : ''}
              autoCapitalize={'none'}
              disabled={disabled}
              disabledLineType={'solid'}
            />
          }
          <View>
            <SimasIcon name={iconName} size={25} style={styles.icon} />
          </View>
          {/* </View> */}
          {err && !isInputAmount && <ErrorTextIndicator text={err} isInputAmount={isInputAmount}/>}
        </View>
      </View>
    );
  }
}

SinarmasInputBoxRevamp.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  value: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  onInputChange: PropTypes.func,
  disabled: PropTypes.bool,
  theme: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isUseSuccessInputText: PropTypes.bool,
  typeField: PropTypes.string,
  setNewUsernameValue: PropTypes.func,
  setNewPasswordValue: PropTypes.func,
  usernameValue: PropTypes.string,
  passwordValue: PropTypes.string,
  oldPassword: PropTypes.string,
  validationInput: PropTypes.func,
  width: PropTypes.any,
  iconName: PropTypes.string,
  leftIcon: PropTypes.string,
  textPosition: PropTypes.string,
  borderOff: PropTypes.bool,
  isInputAmount: PropTypes.bool,
  isSwiftCode: PropTypes.bool
};

export default SinarmasInputBoxRevamp;
