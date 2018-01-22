import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyListService from '../services/CompanyListService';
import CompanyUserListScene from './CompanyUserListScene';

class CompanyUserListSceneContainer extends Component {

  roles = [];
  componentDidMount() {
    CompanyListService.load();
    if (localStorage.role === 'SCHOOL_MANAGER') {
      this.roles = ['TEACHER', 'SCHOOL_MANAGER'];
    } else {
      this.roles = ['COMPANY_MANAGER', 'TEACHER', 'SCHOOL_MANAGER'];
    }
  }

  render() {
    return (
      <CompanyUserListScene
        companies={toJS(CompanyListService.filteredCompanies)}
        fetching={CompanyListService.fetch.fetching}
        roles={this.roles}
      />
    );
  }
}

export default observer(CompanyUserListSceneContainer);
