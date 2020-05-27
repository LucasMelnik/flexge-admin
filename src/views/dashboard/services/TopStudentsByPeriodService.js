import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class TopStudentsByPeriodService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
    });
  }

  load = action((from, to, query) => {
    this.data = [];
    this.fetch.fetch({
      url: '/reports/top-students-by-period',
      query: {
        from,
        to,
        ...query
      },
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

export default TopStudentsByPeriodService;
