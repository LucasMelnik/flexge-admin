import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class LastWeekAverageStudiedTimeService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
      average: computed(() => {
        if (!this.data.length) return null;
        const total = this.data.reduce((acc, school) => (
          acc + school.classes.reduce((classAcc, schoolClass) => (
            acc + schoolClass.averageStudiedTime
          ), 0)
        ), 0);
        return total / this.data.reduce((acc, school) => acc + school.classes.length, 0);
      }),
      schoolAverage: computed(() => {
        if (!this.data.length) return null;
        return this.data.reduce((acc, school) => (
          acc + school.schoolAverageStudiedTime
        ), 0) / this.data.length;
      }),
    });
  }

  load = action((from, to) => {
    this.data = [];
    this.fetch.fetch({
      url: '/reports/last-week-average-studied-time',
      query: {
        from,
        to,
      },
    }).then(() => {
      this.data = this.fetch.data;
    });
  });
}

const lastWeekAverageStudiedTimeService = new LastWeekAverageStudiedTimeService();

export default lastWeekAverageStudiedTimeService;
