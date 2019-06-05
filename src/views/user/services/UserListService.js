import { action, extendObservable } from 'mobx';
import capitalize from 'lodash/capitalize';
import pickBy from 'lodash/pickBy';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';
import UserListFilterService from './UserListFilterService';

class UserListService {
  fetch = new FetchService();
  filterForm = new FormService();
  baseQuery = {};

  constructor() {
    extendObservable(this, {
      users: [],
    });
  }

  init = action((baseQuery) => {
    this.users = [];
    this.baseQuery = baseQuery;
    this.filterForm.setInitialValues({});
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/users',
      query: {
        query: {
          ...this.baseQuery,
          ...Object.keys(pickBy(UserListFilterService.form.getValues(), v => !!v)).reduce((acc, key) => Object.assign({}, acc, { [key]: UserListFilterService.form.getValue(key) }), {}),
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.users = this.fetch.data.map(user => ({
          ...user,
          role: capitalize(user.role.replace(/_/g, ' ')),
        }));
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
          if (this.fetch.data) {
            NotificationService.addNotification('User deleted', 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

export default UserListService;
