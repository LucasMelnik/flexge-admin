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
    value: PropTypes.string,
    maxHeight: PropTypes.number,
  };

  static defaultProps = {
    disabled: false,
    errorText: null,
    label: '',
    multiple: false,
    fullWidth: true,
    style: null,
    value: '',
    maxHeight: 200,
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
        {this.state.data.map(option => (
          <MenuItem
            key={`${option.id}-${option.name}`}
            value={option.id}
            primaryText={option.name}
            label={option.name}
          />
        ))}
      </SelectField>
    );
  }
}
