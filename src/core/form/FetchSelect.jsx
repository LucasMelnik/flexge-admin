import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import toLower from 'lodash/toLower';
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
    errorText: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    defaultSelect: PropTypes.bool,
    required: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: 'Select...',
    value: null,
    errorText: null,
    disabled: false,
    defaultSelect: false,
    required: false,
  };

  state = { data: [] };

  searchService = (url) => {
    const fetchService = new FetchService();
    fetchService.fetch({
      url: `/${url}`,
    })
      .then(() => {
        if (fetchService.data) {
          const data = toJS(fetchService.data);
          this.setState({
            data: sortBy(data, item => toLower(item[this.props.resultTransformer.text])),
          }, () => {
            if (this.props.defaultSelect) {
              this.props.onChange(this.state.data[0].id || null);
            }
          });
        }
      });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.searchService(nextProps.url);
    }
  }

  componentWillMount() {
    if (this.props.url !== null) {
      this.searchService(this.props.url);
    }
  }

  render() {
    return (
      <Select
        required={this.props.required}
        value={this.props.value}
        label={this.props.label}
        disabled={this.props.disabled}
        errorText={this.props.errorText}
        placeholder={this.props.placeholder}
        onChange={value => this.props.onChange(value, this.state.data.find(item => item[this.props.resultTransformer.value] === value))}
        options={this.state.data.map(option => ({
          label: option[this.props.resultTransformer.text],
          value: option[this.props.resultTransformer.value],
        }))}
      />
    );
  }
}
