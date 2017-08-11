import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select2 from 'react-select';
import 'react-select/dist/react-select.css';
import './Select.css';

export default class Select extends Component {

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })),
    description: PropTypes.string,
    fieldValidation: PropTypes.string,
  };

  static defaultProps = {
    placeholder: 'Select...',
    options: [],
    value: '',
    fieldValidation: null,
    description: null,
  };

  render() {
    return (
      <div>
        <div
          style={{
            minWidth: 250,
            fontWeight: 400,
            display: 'flex',
            color: '#555555',
            marginBottom: 10,
          }}
        >
          <div>
            {this.props.label}
          </div>
          <div style={{
            marginLeft: 15,
            fontSize: 13,
            display: 'inline-block',
            color: 'red',
          }}>
            {this.props.description}
          </div>
        </div>
        <div
          style={this.props.fieldValidation && { border: '1px solid red' }}
        >
          <Select2
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            value={this.props.value}
            options={this.props.options}
            resetValue=""
            onChange={(option) => this.props.onChange && this.props.onChange(option.value || '')}
          />
        </div>
      </div>
    );
  }
}
