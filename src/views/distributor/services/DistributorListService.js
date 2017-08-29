import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class DistributorListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      distributors: [],
      filter: '',
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/distributors',
      query: {
        query: this.filter && {
          name: {
            $regex: this.filter,
            $options: 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.distributors = this.fetch.data;
      } else {
        this.distributors = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((distributor) => {
    ConfirmationDialogService.show(
      'Delete Distributor',
      `You are about to delete the distributor "${distributor.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/distributors/${distributor.id}`,
          method: 'delete',
        }).then(() => {
          window.showSuccess(`Distributor "${distributor.name}" deleted successfully.`);
          this.load();
        });
      });
  });
}

const distributorListService = new DistributorListService();

export default distributorListService;
