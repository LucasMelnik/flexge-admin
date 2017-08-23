import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyListService from '../services/CompanyListService';
import UserDistributorListScene from './UserDistributorListScene';

class UserDistributorListSceneContainer extends Component {

  componentDidMount() {
    CompanyListService.load();
  }

  render() {
    return (
      <UserDistributorListScene
        companies={toJS(CompanyListService.companies)}
        fetching={CompanyListService.fetch.fetching}
      />
    );
  }
}

export default observer(UserDistributorListSceneContainer);
