import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class TopStudentsByPeriodService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      topStudentsByPeriod: [],
    });
  }

  load = action((from, to) => {
    this.topStudentsByPeriod = [];
    this.fetch.fetch({
      url: '/reports/top-students-by-period',
      query: {
        from,
        to,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.topStudentsByPeriod = this.fetch.data;
      }
    });
  });
}

export default TopStudentsByPeriodService;
