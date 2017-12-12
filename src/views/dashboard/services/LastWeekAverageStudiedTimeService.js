import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class LastWeekAverageStudiedTimeService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: {},
      averageStudiedTimeByClass: computed(() => {
        if (!this.validateResponse()) return 0;
        const averageStudiedTime = this.data
          .filter(school => !this.schoolId || school.id === this.schoolId)[0]
          .filter(schoolClass => !this.classId || schoolClass.id === this.classId)[0].averageStudiedTime
        return averageStudiedTime;
      }),
    })
  }

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
