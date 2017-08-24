import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import AdminCompanyListService from '../services/AdminCompanyListService';
import UserAdminListScene from './UserAdminListScene';

class UserAdminListSceneContainer extends Component {

  componentDidMount() {
    AdminCompanyListService.load();
  }

  render() {
    return (
      <UserAdminListScene
        companies={toJS(AdminCompanyListService.companies)}
        fetching={AdminCompanyListService.fetch.fetching}
      />
    );
  }
}

export default observer(UserAdminListSceneContainer);
