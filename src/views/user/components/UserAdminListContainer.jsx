import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UserAdminList from './UserAdminList';
import UserAdminListService from '../services/UserAdminListService';

class UserAdminListContainer extends Component {

  componentDidMount() {
    UserAdminListService.init();
  }

  render() {
    return (
      <UserAdminList
        users={toJS(UserAdminListService.users)}
        fetching={UserAdminListService.fetch.fetching}
        onDelete={UserAdminListService.handleRemove}
      />
    );
  }
}

export default observer(UserAdminListContainer);
