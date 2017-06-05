import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class CompanyManagerListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      companyId: null,
      managers: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
    });
  }

  load = action((companyId) => {
    this.companyId = companyId;
    this.fetch.fetch({
      url: `/companies/${companyId}/managers`,
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
}

const companyListService = new CompanyManagerListService();

export default companyListService;
