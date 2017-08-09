import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';

export default class Select extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    options: PropTypes.node,
  };

  static defaultProps = {
    placeholder: 'Select...',
    options: [],
  };

  componentDidMount() {
    $(this.select2).select2({
      placeholder: this.props.placeholder,
      allowClear: true,
    });
  }

  render() {
    return (
      <div>
        <div
          style={{
            fontWeight: 400,
            color: '#555555',
            marginBottom: 10,
          }}
        >
          {this.props.label}
        </div>
        <select
          ref={select2 => this.select2 = select2}
          style={{ width: '100%' }}
        >
          <option></option>
          {/* {this.state.options.map(item => (
            item
          ))} */}
        </select>
      </div>
    );
  }
}
