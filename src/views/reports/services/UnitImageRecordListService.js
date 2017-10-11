import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class SchoolRecordListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      units: [],
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/reports/units-image',
    }).then(() => {
      if (this.fetch.data) {
        this.units = this.fetch.data;
      } else {
        this.units = [];
      }
    });
  });

}

const schoolRecordListService = new SchoolRecordListService();

export default schoolRecordListService;
