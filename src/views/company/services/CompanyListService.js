import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class CompanyListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      companies: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: computed(() => Math.ceil(this.total / this.rowsByPage)),
    });
  }

  load = action(() => {
    this.fetch.fetch({
      url: '/companies',
      query: {
        page: this.page,
        size: this.rowsByPage,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.companies = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
      } else {
        this.companies = [];
        this.total = 0;
      }
    });
  });

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
  });
}

const companyListService = new CompanyListService();

export default companyListService;
