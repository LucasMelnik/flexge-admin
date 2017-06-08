import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class ModuleListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      modules: [],
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
      url: '/modules',
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
        this.modules = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.modules = [];
        this.total = 0;
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

  handleRemove = action((moduleId) => {
    this.fetch.fetch({
      url: `/modules/${moduleId}`,
      method: 'delete',
    }).then(() => {
      this.load();
    });
  });
}

const moduleListService = new ModuleListService();

export default moduleListService;
