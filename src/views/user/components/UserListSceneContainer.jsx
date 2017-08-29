import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyListService from '../services/CompanyListService';
import UserListScene from './UserListScene';

class UserListSceneContainer extends Component {

  componentDidMount() {
    CompanyListService.load();
  }

  render() {
    return (
      <UserListScene
        companies={toJS(CompanyListService.companies)}
        fetching={CompanyListService.fetch.fetching}
      />
    );
  }
}

export default observer(UserListSceneContainer);
