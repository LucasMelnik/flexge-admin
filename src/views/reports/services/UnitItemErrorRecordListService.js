import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class UnitItemErrorRecordListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      items: [],
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/reports/units-errors',
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
