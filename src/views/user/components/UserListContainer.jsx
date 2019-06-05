import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UserList from './UserList';
import UserListService from '../services/UserListService';
import UserListFilterService from '../services/UserListFilterService';

class UserListContainer extends Component {

  userListService = new UserListService();

  static propTypes = {
    baseQuery: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['ADMIN', 'DISTRIBUTOR', 'COMPANY']).isRequired,
  };

  componentDidMount() {
    this.userListService.init(this.props.baseQuery);
    UserListFilterService.init(this.userListService.load);
  }

  render() {
    return (
      <UserList
        type={this.props.type}
        baseUrl={this.props.baseUrl}
        users={toJS(this.userListService.users)}
        fetching={this.userListService.fetch.fetching}
        onDelete={this.userListService.handleRemove}
      />
    );
  }
}

export default observer(UserListContainer);
