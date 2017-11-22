import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyListService from '../services/CompanyListService';
import CompanyUserListScene from './CompanyUserListScene';

class CompanyUserListSceneContainer extends Component {

  componentDidMount() {
    CompanyListService.load();
  }

  render() {
    return (
      <CompanyUserListScene
        companies={toJS(CompanyListService.filteredCompanies)}
        fetching={CompanyListService.fetch.fetching}
      />
    );
  }
}

export default observer(CompanyUserListSceneContainer);
