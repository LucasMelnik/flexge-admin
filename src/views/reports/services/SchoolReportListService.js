import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class SchoolReportListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      schools: [],
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/reports/schools',
    }).then(() => {
      if (this.fetch.data) {
        this.schools = this.fetch.data;
      } else {
        this.schools = [];
      }
    });
  });

}

const schoolReportListService = new SchoolReportListService();

export default schoolReportListService;
