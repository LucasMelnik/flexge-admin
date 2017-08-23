import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyListService from '../services/CompanyListService';
import UserAdminListScene from './UserAdminListScene';

class UserAdminListSceneContainer extends Component {

  componentDidMount() {
    CompanyListService.load();
  }

  render() {
    return (
      <UserAdminListScene
        companies={toJS(CompanyListService.companies)}
        fetching={CompanyListService.fetch.fetching}
      />
    );
  }
}

export default observer(UserAdminListSceneContainer);
