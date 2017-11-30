import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class ManagerListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      url: null,
      managers: [],
    });
  }

  init = action((url) => {
    this.managers = [];
    this.url = url;
  });

  load = action(() => {
    this.fetch.fetch({
      url: this.url,
    }).then(() => {
      if (this.fetch.data) {
        this.managers = this.fetch.data;
      } else {
        this.managers = [];
        this.total = 0;
      }
    });
  });

  handleRemove = action((manager) => {
    ConfirmationDialogService.show(
      'Delete Manager',
      `You are about to delete the manager "${manager.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `${this.url}/${manager.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const managerListService = new ManagerListService();

export default managerListService;
