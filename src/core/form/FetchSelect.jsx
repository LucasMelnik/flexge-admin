import React, { Component } from 'react';
import { toJS } from 'mobx';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import toLower from 'lodash/toLower';
import get from 'lodash/get';
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
    resultFilter: PropTypes.func,
    placeholder: PropTypes.string,
    errorText: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    defaultSelect: PropTypes.bool,
    required: PropTypes.bool,
    showSearch: PropTypes.bool,
    multiple: PropTypes.bool,
    params: PropTypes.object,
  };

  static defaultProps = {
    placeholder: 'Select...',
    value: null,
    errorText: null,
    disabled: false,
    defaultSelect: false,
    required: false,
    multiple: false,
    showSearch: false,
    params: {},
    resultFilter: () => true,
  };

  state = { data: [] };

  searchService = () => {
    const fetchService = new FetchService();
    fetchService.fetch({
      url: `/${this.props.url}`,
      query: this.props.params
    })
      .then(() => {
        if (fetchService.data) {
          const data = toJS(fetchService.data);
          if (this.props.value && !data.find(item => item[this.props.resultTransformer.value] === this.props.value)) {
            this.props.onChange(null);
          }
          this.setState({
            data: sortBy(data.filter(this.props.resultFilter), item => toLower(item[this.props.resultTransformer.text])),
          }, () => {
            if (this.props.defaultSelect) {
              const firstData = this.state.data[0];
              this.props.onChange(get(firstData, this.props.resultTransformer.value) || null);
            }
          });
        }
      });
  };

  componentDidMount() {
    if (this.props.url) {
      this.searchService();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url || JSON.stringify(this.props.params) !== JSON.stringify(prevProps.params)) {
      this.searchService();
    }
  }

  render() {
    return (
      <Select
        multiple={this.props.multiple}
        required={this.props.required}
        value={this.props.value}
        label={this.props.label}
        showSearch={this.props.showSearch}
        disabled={this.props.disabled}
        errorText={this.props.errorText}
        placeholder={this.props.placeholder}
        onChange={value => this.props.onChange(value, this.state.data.find(item => item[this.props.resultTransformer.value] === value))}
        options={this.state.data.map(option => ({
          label: get(option, this.props.resultTransformer.text),
          value: get(option, this.props.resultTransformer.value),
        }))}
        filterOption={(value, option) => option.props.children.toLowerCase().indexOf(value.toLowerCase()) > -1}
      />
    );
  }
}
