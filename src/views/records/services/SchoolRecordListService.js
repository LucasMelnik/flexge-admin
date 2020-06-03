import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class SchoolRecordListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      schools: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 50,
      },
    });
  }

  init = action(() => {
    this.schools = [];
    this.form.setInitialValues({});
    if (localStorage.role !== 'ADMIN') {
      this.load();
    }
  });

  load = action((page) => {
    if (page) {
      this.pagination.current = page.current;
    }
    this.fetch.fetch({
      url: '/records/schools',
      query: {
        page: page ? page.current - 1 : 0,
        size: this.pagination.pageSize,
        ...this.form.getValue('school') && {
          school: this.form.getValue('school'),
        },
        ...this.form.getValue('company') && {
          company: this.form.getValue('company'),
        },
      }
    }).then(() => {
      if (this.fetch.data) {
        this.schools = this.fetch.data.data;
        this.pagination.total = this.fetch.data.total;
      } else {
        this.schools = [];
      }
    });
  });

}

const schoolRecordListService = new SchoolRecordListService();

export default schoolRecordListService;
