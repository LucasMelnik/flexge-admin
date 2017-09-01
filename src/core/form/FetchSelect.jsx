import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { toJS } from 'mobx';
import Select from './Select';
import FetchService from '../services/FetchService';

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
    defaultSelect: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: 'Select...',
    value: null,
    fieldValidation: null,
    description: null,
    disabled: false,
    defaultSelect: false,
  };

  state = { data: [] };

  componentWillMount() {
    const fetchService = new FetchService();
    fetchService.fetch({
      url: `/${this.props.url}`,
    })
      .then(() => {
        if (fetchService.data) {
          const data = toJS(fetchService.data);
          this.setState({
            data: sortBy(data, item => String(item[this.props.resultTransformer.text]).toLowerCase()),
          }, () => {
            if (this.props.defaultSelect) {
              this.props.onChange(this.state.data[0].id || null);
            }
          });
        }
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
