import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UserList from './UserList';
import UserListService from '../services/UserListService';

class UserListContainer extends Component {

  userListService = new UserListService();

  static propTypes = {
    company: PropTypes.object,
    roleUser: PropTypes.oneOf(['USER', 'ADMIN', 'DISTRIBUTOR']).isRequired,
  }

  static defaultProps = {
    company: null,
  }

  componentDidMount() {
    this.userListService.init(this.props.company, this.props.roleUser);
  }

  render() {
    return (
      <UserList
        users={toJS(this.userListService.users)}
        fetching={this.userListService.fetch.fetching}
        onDelete={this.userListService.handleRemove}
      />
    );
  }
}

export default observer(UserListContainer);
