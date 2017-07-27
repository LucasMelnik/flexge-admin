import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import MaskInput from './MaskInput';

export default class TimeInput extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    errorText: PropTypes.string,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.any,
  };

  static defaultProps = {
    value: '',
    label: null,
    errorText: null,
    fullWidth: false,
    disabled: false,
    onChange: () => false,
  };

  state = { maskedValue: '' };

  componentWillReceiveProps(nextProps) {
    // manually add '00'because format does not add it when time lees then 61 seconds
    this.setState({
      maskedValue: `${nextProps.value < 60 ? '00' : ''}${moment.duration(nextProps.value, "seconds").format("mm:ss")}`,
    });
  }

  handleChange = (rawValue, formattedValue) => {
    //only trigger the onChange when the user typed an complete time
    if (formattedValue.length === 5) {
      console.log(moment.duration(`00:${formattedValue}`).asSeconds());
      this.props.onChange(moment.duration(`00:${formattedValue}`).asSeconds(), formattedValue);
    }
    this.setState({
      maskedValue: formattedValue,
    })
  };

  render() {
    return (
      <MaskInput
        label={this.props.label}
        errorText={this.props.errorText}
        value={this.state.maskedValue}
        onChange={this.handleChange}
        fullWidth={this.props.fullWidth}
        disabled={this.props.disabled}
        maskType="custom"
        delimiters={[':']}
        blocks={[2, 2]}
        numericOnly
        numeralPositiveOnly
      />
    );
  }
}
