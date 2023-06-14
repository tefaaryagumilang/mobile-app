import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';
import noop from 'lodash/noop';
import {formatFieldAccount} from '../../utils/transformer.util';

class EmailVerificationInput extends React.Component {
  state = {
    maxLength: 6,
    value: ''
  }

  static propTypes = {
    input: PropTypes.object,
    style: PropTypes.object,
    submitHandler: PropTypes.func
  }
  
  static defaultProps = {
    input: {
      onChange: noop
    },
    submitHandler: noop,
  }

  handleEasyPinChange = (pin) => {
    const {submitHandler, input} = this.props;
    const newPin = String(formatFieldAccount(pin));
    this.setState({value: newPin});
    input.onChange(formatFieldAccount(pin));
    if (newPin.length >= this.state.maxLength) {
      submitHandler(formatFieldAccount(pin));
    }
  }

  componentWillReceiveProps (newProps) {
    this.setState({value: newProps.input.value});
  }

  render () {
    const {style, ...extraProps} = this.props;
    return <TextInput {...extraProps} underlineColorAndroid='transparent' onChangeText={this.handleEasyPinChange} style={style} value={this.state.value} keyboardType='numeric' maxLength={6}/>;
  }
}

export default EmailVerificationInput;
