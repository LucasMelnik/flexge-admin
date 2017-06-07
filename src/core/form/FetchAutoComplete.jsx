import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AutoComplete from './AutoComplete';

export default class FetchAutoComplete extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    label: PropTypes.string,
    fullWidth: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onUpdateInput: PropTypes.func,
    resultTransformer: PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    style: PropTypes.object,
    value: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    errorText: null,
    label: '',
    fullWidth: true,
    style: null,
    value: '',
    onUpdateInput: null,
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
      this.setState({
        data: response.data.docs || response.data,
      });
      return response.data;
    });
  }

  render() {
    return (
      <AutoComplete
        dataSource={this.state.data}
        dataSourceConfig={this.props.resultTransformer}
        disabled={this.props.disabled}
        errorText={this.props.errorText}
        label={this.props.label}
        fullWidth={this.props.fullWidth}
        onSelect={this.props.onSelect}
        onUpdateInput={this.props.onUpdateInput}
        style={this.props.style}
        value={this.props.value}
      />
    );
  }
}
