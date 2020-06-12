import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.br';
import TextInput from './TextInput';

export default class MaskInput extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    errorText: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    maskType: PropTypes.oneOf([
      'phone',
      'numeral',
      'custom',
    ]),
    delimiters: PropTypes.arrayOf(PropTypes.string),
    blocks: PropTypes.arrayOf(PropTypes.number),
    numericOnly: PropTypes.bool,
    numeralPositiveOnly: PropTypes.bool,
    required: PropTypes.bool,
  };

  static defaultProps = {
    value: '',
    disabled: false,
    errorText: null,
    placeholder: null,
    delimiters: [],
    numericOnly: false,
    numeralPositiveOnly: false,
    required: false,
    maskType: 'custom',
    blocks: [],
  };

  state = { maskedValue: '' };

  componentDidMount() {
    const maskOptions = {
      delimiters: this.props.delimiters,
      numericOnly: this.props.numericOnly,
      blocks: this.props.blocks,
      numeralPositiveOnly: this.props.numeralPositiveOnly,
      phoneRegionCode: 'BR',
      onValueChanged: this.handleChange,
    };
    maskOptions[this.props.maskType] = true;

    this.maskedField = new Cleave($(ReactDOM.findDOMNode(this.textInput)).find('input'), maskOptions);

    this.maskedField.setRawValue(this.props.value);
    this.setState({
      maskedValue: this.maskedField.getFormattedValue(),
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.maskedField) {
      this.maskedField.setRawValue(nextProps.value);
      this.setState({
        maskedValue: this.maskedField.getFormattedValue(),
      });
    }
  }

  componentWillUnmount() {
    this.maskedField.destroy();
  }

  handleChange = () => {
    if (this.maskedField.getFormattedValue() === this.state.maskedValue) {
      return;
    }

    this.setState({
      maskedValue: this.maskedField.getFormattedValue(),
    }, () => {
      this.props.onChange(this.maskedField.getRawValue(), this.maskedField.getFormattedValue());
    });
  };

  render() {
    return (
      <TextInput
        required={this.props.required}
        label={this.props.label}
        value={this.state.maskedValue}
        // onChange={this.handleChange}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
        errorText={this.props.errorText}
        type="text"
        ref={input => { this.textInput = input; }}
      />
    );
  }
}
