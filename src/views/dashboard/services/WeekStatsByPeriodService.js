import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class WeekStatsByPeriodService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
    });
  }

  load = action((from, to) => {
    this.data = [];
    this.fetch.fetch({
      url: '/reports/week-stats-by-period',
      query: {
        from,
        to,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const dataService = new WeekStatsByPeriodService();

export default dataService;
