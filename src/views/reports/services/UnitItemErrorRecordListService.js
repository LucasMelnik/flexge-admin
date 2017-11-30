import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class UnitItemErrorRecordListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      items: [],
      filteredItems: [],
    });
  }

  init = action(() => {
    this.items = [];
    this.load();
  });

  filter = action(() => {
    const type = this.form.getValue('type');
    if (type) {
      this.items = this.filteredItems.filter(item =>
        item.errors.findIndex(i => i.value === type) > -1).map(item => item);
    } else {
      this.items = this.filteredItems;
    }
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
        this.items = this.fetch.data.filter(item => item.id);
        this.filteredItems = this.items;
      } else {
        this.items = [];
      }
    });
  });

}

const unitItemErrorRecordListService = new UnitItemErrorRecordListService();

export default unitItemErrorRecordListService;
