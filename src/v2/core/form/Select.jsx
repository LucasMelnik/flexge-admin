import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';
import Select2 from 'react-select';
import 'react-select/dist/react-select.css';
import './Select.css';

export default class Select extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.node,
    description: PropTypes.string,
    fieldValidation: PropTypes.string,
  };

  static defaultProps = {
    placeholder: 'Select...',
    options: [],
    value: null,
    fieldValidation: null,
    description: null,
  };

  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            fontWeight: 400,
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
            color: 'red',
          }}>
            {this.props.description}
          </div>
        </div>
        <div
          style={this.props.fieldValidation && { border: '1px solid red' }}
        >
          <Select2
            placeholder={this.props.placeholder}
            value={this.props.value}
            options={this.props.options}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
}
