import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import $ from 'jquery';
import TextInput from './TextInput';
import 'bootstrap-datepicker/js/bootstrap-datepicker';

export default class DateInput extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    format: PropTypes.string,
    value: PropTypes.instanceOf(Date),
    placeholder: PropTypes.string,
    description: PropTypes.string,
    disabled: PropTypes.bool,
    fieldValidation: PropTypes.oneOf(['error', 'warning', 'success']),
    helpText: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    format: 'DD/MM/YYYY',
    value: null,
    description: null,
    placeholder: null,
    disabled: false,
    fieldValidation: null,
    helpText: null,
    onChange: () => false,
  };

  state = { maskedValue: '' };

  componentDidMount() {
    this.datepicker = $(this.input).datepicker({
      autoclose: true,
      clearBtn: true,
    });

    if (this.props.value) {
      this.datepicker.datepicker('update', this.props.value);
      this.setState({
        maskedValue: moment(this.props.value).format(this.props.format),
      });
    }

    this.datepicker.on('changeDate', (event) => {
      this.props.onChange(event.date || null);
      this.setState({
        maskedValue: event.date ? moment(event.date).format(this.props.format) : '',
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.datepicker.datepicker('update', nextProps.value ? nextProps.value : '');
    this.setState({
      maskedValue: nextProps.value ? moment(nextProps.value).format(this.props.format) : '',
    });
  }

  componentWillUnmount() {
    this.datepicker.datepicker('destroy');
  }

  handleShowPicker = () => {
    this.datepicker.datepicker('show');
  };

  render() {
    return (
      <div>
        <TextInput
          value={this.state.maskedValue}
          label={this.props.label}
          placeholder={this.props.placeholder}
          description={this.props.description}
          helpText={this.props.helpText}
          disabled={this.props.disabled}
          fieldValidation={this.props.fieldValidation}
          onFocus={this.handleShowPicker}
        />
        <input
          ref={input => this.input = input}
          style={{
            position: 'absolute',
            visibility: 'hidden',
          }}
        />
      </div>
    );
  }
}
