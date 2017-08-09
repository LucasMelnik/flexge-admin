import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyList from './CompanyList';
import CompanyListService from '../services/CompanyListService';

class CompanyListContainer extends Component {

  componentDidMount() {
    CompanyListService.init();
  }

  render() {
    return (
      <CompanyList
        companies={toJS(CompanyListService.companies)}
        fetching={CompanyListService.fetch.fetching}
        onDelete={CompanyListService.handleRemove}
      />
    );
  }
}

export default observer(CompanyListContainer);
