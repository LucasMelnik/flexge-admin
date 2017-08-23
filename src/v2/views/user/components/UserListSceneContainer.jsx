import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import CompanyListService from '../services/CompanyListService';
import UserListScene from './UserListScene';

class UserListSceneContainer extends Component {

  static propTypes = {

  };

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
