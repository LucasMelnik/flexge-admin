import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudentReportListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      students: [],
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/reports/students',
    }).then(() => {
      if (this.fetch.data) {
        this.students = this.fetch.data;
      } else {
        this.students = [];
      }
    });
  });

}

const studentReportListService = new StudentReportListService();

export default studentReportListService;
