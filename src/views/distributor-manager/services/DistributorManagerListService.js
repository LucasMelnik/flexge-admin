import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class DistributorManagerListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      distributorId: null,
      managers: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
    });
  }

  init = action((distributorId) => {
    this.distributorId = distributorId;
    this.page = 1;
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/distributors/${this.distributorId}/managers`,
      query: {
        page: this.page,
        size: this.rowsByPage,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.managers = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.managers = [];
        this.total = 0;
      }
    });
  });

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
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
