import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyList from './CompanyList';
import CompanyListService from '../services/CompanyListService';

class CompanyListContainer extends Component {

  static propTypes = {
    distributorId: PropTypes.string,
  }

  static defaultProps ={
    distributorId: null,
  }

  componentDidMount() {
    if (this.props.distributorId) {
      CompanyListService.loadCompaniesByDistributorId(this.props.distributorId);
    } else {
      CompanyListService.init();
    }
  }

  render() {
    return (
      <CompanyList
        distributorId={this.props.distributorId}
        companies={toJS(CompanyListService.companies)}
        fetching={CompanyListService.fetch.fetching}
        onDelete={CompanyListService.handleRemove}
      />
    );
  }
}

export default observer(CompanyListContainer);
