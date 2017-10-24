import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class UserAdminListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      users: [],
      filteredUsers: [],
      filter: '',
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/users',
      query: {
        query: {
          role: ['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN', 'AUDIO_CONTENT'],
          ...this.filter && {
            name: {
              $regex: this.filter,
              $options: 'i',
            },
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.users = this.fetch.data;
        this.filteredUsers = this.users;
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
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

const userAdminListService = new UserAdminListService();

export default userAdminListService;
