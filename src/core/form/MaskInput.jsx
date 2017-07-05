import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cleave from 'cleave.js';
//eslint-disable-next-line
import CleavePhoneBr from 'cleave.js/dist/addons/cleave-phone.br';
import TextField from 'material-ui/TextField';

export default class MaskInput extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    errorText: PropTypes.string,
    fullWidth: PropTypes.bool,
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
  };

  static defaultProps = {
    value: '',
    label: null,
    errorText: null,
    fullWidth: false,
    disabled: false,
    maskType: 'custom',
    delimiters: [],
    numericOnly: false,
    numeralPositiveOnly: false,
    blocks: [],
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

    this.maskedField = new Cleave(this.textField.input, maskOptions);
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
      <TextField
        floatingLabelText={this.props.label}
        errorText={this.props.errorText}
        value={this.state.maskedValue}
        onChange={this.handleChange}
        fullWidth={this.props.fullWidth}
        disabled={this.props.disabled}
        type="text"
        ref={input => { this.textField = input; }}
      />
    );
  }
}
