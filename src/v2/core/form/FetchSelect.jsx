import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { sortBy } from 'lodash';
import Select from './Select';

export default class FetchSelect extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    resultTransformer: PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string,
    }).isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    description: PropTypes.string,
    fieldValidation: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: 'Select...',
    value: null,
    fieldValidation: null,
    description: null,
    disabled: false,
  };

  state = { data: [] };

  componentWillMount() {
    axios.request({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/${this.props.url}`,
      headers: {
        ...localStorage.accessToken && { Authorization: `Bearer ${localStorage.accessToken}` },
      },
    }).then((response) => {
      const data = response.data.docs || response.data;
      this.setState({
        data: sortBy(data, item => item[this.props.resultTransformer.text].toLowerCase()),
      }, () => {
        if (this.props.defaultSelect) {
          this.props.onChange(this.state.data[0].id || null);
        }
      });
    });
  }

  render() {
    return (
      <Select
        value={this.props.value}
        label={this.props.label}
        disabled={this.props.disabled}
        description={this.props.description}
        fieldValidation={this.props.fieldValidation}
        placeholder={this.props.placeholder}
        onChange={(value) => this.props.onChange(value, this.state.data.find(item => item[this.props.resultTransformer.value] === value))}
        options={this.state.data.map(option => ({
          label: option[this.props.resultTransformer.text],
          value: option[this.props.resultTransformer.value],
        }))}
      />
    );
  }
}
