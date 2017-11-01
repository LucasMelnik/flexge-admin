import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class UnitItemErrorRecordListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      items: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 15,
      },
    });
  }

  init = action(() => {
    this.load();
  });

  load = action((page) => {
    if (page && page.current) {
      this.pagination.current = page.current;
    }
    this.fetch.fetch({
      url: '/reports/units-errors',
      // url: `/reports/units-errors?skip=${this.pagination.current}&skip=${this.pagination.pageSize}`,
      query: {
        ...this.form.getValue('course') && {
          course: this.form.getValue('course'),
        },
        ...this.form.getValue('module') && {
          module: this.form.getValue('module'),
        },
        ...this.form.getValue('unit') && {
          unit: this.form.getValue('unit'),
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        const filteredItems = this.fetch.data.filter(item => item.id);
        this.items = filteredItems;
      } else {
        this.items = [];
      }
    });
  });

}

const unitItemErrorRecordListService = new UnitItemErrorRecordListService();

export default unitItemErrorRecordListService;
