import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class DistributorListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      distributors: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: computed(() => Math.ceil(this.total / this.rowsByPage)),
    });
  }

  load = action(() => {
    this.fetch.fetch({
      url: '/distributors',
      query: {
        page: this.page,
        size: this.rowsByPage,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.distributors = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
      } else {
        this.distributors = [];
        this.total = 0;
      }
    });
  });

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
  });
}

const companyListService = new DistributorListService();

export default companyListService;
