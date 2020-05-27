import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class AverageStudyQualityByPeriodService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
    });
  }

  load = action((from, to, query) => {
    this.data = [];
    this.fetch.fetch({
      url: '/reports/average-study-quality-by-period',
      query: {
        from,
        to,
        level: 'week',
        ...query
      },
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const averageStudyQualityByPeriodService = new AverageStudyQualityByPeriodService();

export default averageStudyQualityByPeriodService;
