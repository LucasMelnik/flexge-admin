import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import DistributorCompanyListService from '../services/DistributorCompanyListService';
import UserDistributorListScene from './UserDistributorListScene';

class UserDistributorListSceneContainer extends Component {

  componentDidMount() {
    DistributorCompanyListService.load();
  }

  render() {
    return (
      <UserDistributorListScene
        companies={toJS(DistributorCompanyListService.companies)}
        fetching={DistributorCompanyListService.fetch.fetching}
      />
    );
  }
}

export default observer(UserDistributorListSceneContainer);
