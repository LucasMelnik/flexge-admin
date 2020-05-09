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

  loadData = () => {
    if (!this.props.distributorId) {
      this.setState({
        loading: false,
        data: {},
      });
      return;
    }
    this.setState({
      loading: true,
      data: {},
    });
    axios.request({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/data-import?query[distributor]=${this.props.distributorId}`,
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

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.distributorId !== this.props.distributorId) {
      this.loadData();
    }
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
