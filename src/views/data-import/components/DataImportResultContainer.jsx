import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DataImportResult from './DataImportResult';
import Async from '../../../core/layout/Async';

class DataImportResultContainer extends Component {
  static propTypes = {
    distributorId: PropTypes.string.isRequired,
  };

  state = {
    loading: false,
    data: {},
  };

  componentDidMount() {
    this.setState({
      loading: true,
      data: {},
    });
    axios.request({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/data-import?distributor=${this.props.distributorId}`,
      headers: {
        ...localStorage.accessToken && { Authorization: `Bearer ${localStorage.accessToken}` },
      },
    }).then((response) => {
      this.setState({
        loading: false,
        data: response.data,
      });
    }).catch(() => {
      this.setState({
        loading: true,
        data: {},
      });
    });
  }

  render() {
    return (
      <Async fetching={this.state.loading}>
        <DataImportResult
          data={this.state.data}
        />
      </Async>
    );
  }
}

export default DataImportResultContainer;
