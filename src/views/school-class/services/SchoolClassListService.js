import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class SchoolClassListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      classes: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
      schoolId: null,
    });
  }

  init = action((schoolId) => {
    this.schoolId = schoolId;
    this.page = 1;
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/schools/${this.schoolId}/classes`,
      query: {
        page: this.page,
        size: this.rowsByPage,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.classes = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.classes = [];
        this.total = 0;
      }
    });
  });

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
  });

  handleDelete = action((classId) => {
    this.fetch.fetch({
      url: `/schools/${this.schoolId}/classes/${classId}`,
      method: 'delete',
    }).then(() => {
      this.load();
    });
  });
}

const schoolClassListService = new SchoolClassListService();

export default schoolClassListService;
