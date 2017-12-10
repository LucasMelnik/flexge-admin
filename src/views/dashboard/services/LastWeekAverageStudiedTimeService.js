import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class LastWeekAverageStudiedTimeService {
  fetch = new FetchService();

  load = action((from, to) => {
    this.data = {};
    this.fetch.fetch({
      url: '/reports/last-week-average-studied-time',
      query: {
        from,
        to,
      },
    });
  });
}

const lastWeekAverageStudiedTimeService = new LastWeekAverageStudiedTimeService();

export default lastWeekAverageStudiedTimeService;
