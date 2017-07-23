import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { orderBy } from 'lodash';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class FetchSelect extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    label: PropTypes.string,
    fullWidth: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    defaultSelect: PropTypes.bool,
    addEmptyOption: PropTypes.bool,
    value: PropTypes.string,
    maxHeight: PropTypes.number,
    optionsTransformer: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    errorText: null,
    label: '',
    multiple: false,
    defaultSelect: false,
    addEmptyOption: false,
    fullWidth: true,
    style: null,
    value: '',
    maxHeight: 200,
    optionsTransformer: option => ({
      label: option.name,
      value: option.id,
    })
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
      const data = response.data;
      this.setState({
        data: orderBy(data, ['name'], ['asc']),
      }, () => {
        if (this.props.defaultSelect) {
          this.props.onChange(this.state.data[0].id || null);
        }
      });
      return data;
    });
  }

  render() {
    return (
      <SelectField
        floatingLabelText={this.props.label}
        fullWidth={this.props.fullWidth}
        multiple={this.props.multiple}
        disabled={this.props.disabled}
        value={this.props.value}
        maxHeight={this.props.maxHeight}
        onChange={(e, key, payload) => this.props.onChange(payload)}
        errorText={this.props.errorText}
      >
        {this.props.addEmptyOption && (
          <MenuItem
            key="empty"
            value={null}
            primaryText=""
          />
        )}
        {this.state.data.map(this.props.optionsTransformer).map(option => (
          <MenuItem
            key={`${option.value}-${option.value}`}
            value={option.value}
            primaryText={option.label}
            label={option.label}
          />
        ))}
      </SelectField>
    );
  }
}
