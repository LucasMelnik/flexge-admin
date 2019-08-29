import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyList from './CompanyList';
import CompanyListService from '../services/CompanyListService';

class CompanyListContainer extends Component {

  static propTypes = {
    distributorId: PropTypes.string,
    baseUrl: PropTypes.string,
  };

  static defaultProps = {
    distributorId: null,
    baseUrl: '',
  };

  componentDidMount() {
    CompanyListService.init(this.props.distributorId);
  }

  render() {
    return (
      <CompanyList
        distributorId={this.props.distributorId}
        baseUrl={this.props.baseUrl}
        pagination={CompanyListService.pagination}
        companies={toJS(CompanyListService.companies)}
        fetching={CompanyListService.fetch.fetching}
        onDelete={CompanyListService.handleRemove}
        onChange={CompanyListService.load}
      />
    );
  }
}

export default observer(CompanyListContainer);
