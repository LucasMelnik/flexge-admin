import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class AverageStudyQualityByPeriodService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      weekStatsByPeriod: [],
    });
  }

  load = action((from, to) => {
    this.weekStatsByPeriod = [];
    this.fetch.fetch({
      url: '/reports/average-study-quality-by-period',
      query: {
        from,
        to,
        level: 'week',
      },
    }).then(() => {
      if (this.fetch.data) {
        this.weekStatsByPeriod = this.fetch.data;
      }
    });
  });
}

const averageStudyQualityByPeriodService = new AverageStudyQualityByPeriodService();

export default averageStudyQualityByPeriodService;
