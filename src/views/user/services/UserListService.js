import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class UserListService {
  fetch = new FetchService();
  baseQuery = {};

  constructor() {
    extendObservable(this, {
      users: [],
    });
  }

  init = action((baseQuery) => {
    this.baseQuery = baseQuery;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/users',
      query: {
        query: this.baseQuery,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.users = this.fetch.data;
      } else {
        this.users = [];
      }
    });
  });

  handleRemove = action((user) => {
    ConfirmationDialogService.show(
      'Delete User',
      `You are about to delete the user "${user.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/users/${user.id}`,
          method: 'delete',
        }).then(() => {
          NotificationService.addNotification('User deleted', 'success');
          this.load();
        });
      });
  });
}

export default UserListService;
