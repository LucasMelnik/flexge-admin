import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.br';
import TextInput from './TextInput';

export default class MaskInput extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
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
    fieldValidation: PropTypes.oneOf(['error', 'warning', 'success']),
    helpText: PropTypes.string,
  };

  static defaultProps = {
    value: '',
    label: null,
    disabled: false,
    maskType: 'custom',
    delimiters: [],
    numericOnly: false,
    numeralPositiveOnly: false,
    blocks: [],
    fieldValidation: null,
    helpText: null,
  };

  state = { maskedValue: '' };

  componentDidMount() {
    const maskOptions = {
      delimiters: this.props.delimiters,
      numericOnly: this.props.numericOnly,
      blocks: this.props.blocks,
      numeralPositiveOnly: this.props.numeralPositiveOnly,
      phoneRegionCode: 'BR'
    };
    maskOptions[this.props.maskType] = true;

    this.maskedField = new Cleave(window.$(ReactDOM.findDOMNode(this.textInput)).find('input'), maskOptions);
    this.maskedField.setRawValue(this.props.value);
    this.setState({
      maskedValue: this.maskedField.getFormattedValue(),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.maskedField.setRawValue(nextProps.value);
    this.setState({
      maskedValue: this.maskedField.getFormattedValue(),
    });
  }

  componentWillUnmount() {
    this.maskedField.destroy();
  }

  handleChange = () => {
    this.props.onChange(this.maskedField.getRawValue(), this.maskedField.getFormattedValue());
  };

  render() {
    return (
      <TextInput
        label={this.props.label}
        value={this.state.maskedValue}
        onChange={this.handleChange}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
        fieldValidation={this.props.fieldValidation}
        helpText={this.props.helpText}
        type="text"
        ref={input => { this.textInput = input; }}
      />
    );
  }
}
