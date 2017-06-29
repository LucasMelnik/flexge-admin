import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class DistributorManagerListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      distributorId: null,
      managers: [],
    });
  }

  init = action((distributorId) => {
    this.distributorId = distributorId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/distributors/${this.distributorId}/managers`,
    }).then(() => {
      if (this.fetch.data) {
        this.managers = this.fetch.data;
      } else {
        this.managers = [];
      }
    });
  });

  handleDelete = action((manager) => {
    ConfirmationDialogService.show(
      'Delete Distributor Manager',
      `You are about to delete the manager "${manager.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/distributors/${this.distributorId}/managers/${manager.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const distributorManagerListService = new DistributorManagerListService();

export default distributorManagerListService;
