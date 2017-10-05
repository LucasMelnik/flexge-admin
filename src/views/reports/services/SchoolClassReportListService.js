import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class SchoolClassReportListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      schoolClasses: [],
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/reports/school-classes',
    }).then(() => {
      if (this.fetch.data) {
        this.schoolClasses = this.fetch.data;
      } else {
        this.schoolClasses = [];
      }
    });
  });

}

const schoolClassReportListService = new SchoolClassReportListService();

export default schoolClassReportListService;
