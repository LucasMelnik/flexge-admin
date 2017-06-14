import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class SchoolListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      schools: [],
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
      url: '/schools',
      query: {
        page: this.page,
        size: this.rowsByPage,
        query: this.filter && {
          name: {
            $regex: this.filter,
            $options : 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.schools = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.schools = [];
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

  handleRemove = action((school) => {
    ConfirmationDialogService.show(
      'Delete School',
      `You are about to delete the school "${school.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/schools/${school.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const schoolListService = new SchoolListService();

export default schoolListService;
