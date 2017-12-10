import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class WeekStatsByPeriodService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      weekStatsByPeriod: [],
    });
  }

  load = action((from, to) => {
    this.weekStatsByPeriod = [];
    this.fetch.fetch({
      url: '/reports/week-stats-by-period',
      query: {
        from,
        to,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.weekStatsByPeriod = this.fetch.data;
      }
    });
  });
}

const weekStatsByPeriodService = new WeekStatsByPeriodService();

export default weekStatsByPeriodService;
