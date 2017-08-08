import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import $ from 'jquery';
import TextInput from './TextInput';
import 'bootstrap-datepicker/js/bootstrap-datepicker';

export default class DateInput extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    format: PropTypes.string,
    placeholder: PropTypes.string,
    description: PropTypes.string,
    disabled: PropTypes.bool,
    fieldValidation: PropTypes.oneOf(['error', 'warning', 'success']),
    helpText: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    format: 'dd/mm/yyyy',
    description: null,
    placeholder: null,
    disabled: false,
    fieldValidation: null,
    helpText: null,
    onChange: () => false,
  };

  componentDidMount() {
    this.datepicker = $($(ReactDOM.findDOMNode(this.textInput)).find('input')).datepicker({
      format: this.props.format
    });

    if (this.props.value) {
      this.datepicker.datepicker('setDate', this.props.value);
    }

    this.datepicker.on('changeDate', (event) => {
      console.log(event.date)
      this.props.onChange(event.date)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.datepicker.datepicker('setDate', nextProps.value);
  }

  render() {
    return (
      <TextInput
        label={this.props.label}
        placeholder={this.props.placeholder}
        description={this.props.description}
        helpText={this.props.helpText}
        disabled={this.props.disabled}
        fieldValidation={this.props.fieldValidation}
        ref={input => this.textInput = input}
      />
    );
  }
}
