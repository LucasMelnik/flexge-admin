import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class DistributorListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      distributors: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
      filter: '',
    });
  }

  init = action(() => {
    this.page = 1;
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/distributors',
      query: {
        page: this.page,
        size: this.rowsByPage,
        query: this.filter && {
          name: {
            $regex: this.filter,
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.distributors = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.page = this.fetch.data.page;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.distributors = [];
        this.total = 0;
        this.page = 1;
        this.pageCount = 1;
      }
    });
  });

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((distributorId) => {
    this.fetch.fetch({
      url: `/distributors/${distributorId}`,
      method: 'delete',
    }).then(() => {
      this.load();
    });
  });
}

const distributorListService = new DistributorListService();

export default distributorListService;
