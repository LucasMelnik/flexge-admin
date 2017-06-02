import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class DistributorManagerListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      distributorId: null,
      managers: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: computed(() => Math.ceil(this.total / this.rowsByPage)),
    });
  }

  load = action((distributorId) => {
    this.distributorId = distributorId;
    this.fetch.fetch({
      url: `/distributors/${distributorId}/managers`,
      query: {
        page: this.page,
        size: this.rowsByPage,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.managers = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
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
}

const companyListService = new DistributorManagerListService();

export default companyListService;
