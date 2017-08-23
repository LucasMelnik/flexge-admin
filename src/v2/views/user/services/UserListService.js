import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class UserListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      users: [],
      company: null,
    });
  }

  init = action((company) => {
    this.company = company;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/users',
      query: {
        query: {
          company: this.company.id,
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.users = this.fetch.data;
      }
    });
  });

  handleRemove = action((user) => {
    ConfirmationDialogService.show(
      'Delete Manager',
      `You are about to delete the user "${user.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/users/${user.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

export default UserListService;
