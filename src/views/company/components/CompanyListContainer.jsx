import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyList from './CompanyList';
import CompanyListService from '../services/CompanyListService';

class CompanyListContainer extends Component {
  companyListService = new CompanyListService();

  componentDidMount() {
    this.companyListService.load();
  }

  render() {
    return (
      <CompanyList
        companies={toJS(this.companyListService.companies)}
        fetching={this.companyListService.fetch.fetching}
      />
    );
  }
}

export default observer(CompanyListContainer);
