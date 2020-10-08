import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class ActiveStudentsByMonthService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
    });
  }

  load = action(() => {
    this.data = [];
    this.fetch.fetch({
      url: '/reports/active-students-count-by-month',
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const activeStudentsByMonthService = new ActiveStudentsByMonthService();

export default activeStudentsByMonthService;
