import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class UserListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      users: [],
      company: null,
      roleUser: null
    });
  }

  init = action((company, roleUser) => {
    this.company = company;
    this.roleUser = roleUser;
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
        if (this.roleUser === 'ADMIN') {
          this.users = this.fetch.data.filter(user => user.role === 'ADMIN' || user.role === 'CONTENT_ADMIN');
        } else if (this.roleUser === 'DISTRIBUTOR_MANAGER') {
          this.users = this.fetch.data.filter(user => user.role === 'DISTRIBUTOR_MANAGER');
        } else {
          this.users = this.fetch.data.filter(user => user.role === 'COMPANY_MANAGER' || user.role === 'SCHOOL_MANAGER' || user.role === 'TEACHER');
        }
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
