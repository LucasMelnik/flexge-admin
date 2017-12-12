import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class LastWeekAverageStudiedTimeService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
      averageStudiedTimeByClass: computed(() => {
      if (!this.validateResponse()) return 0;
      return this.data
          .filter(school => !this.schoolId || school.id === this.schoolId)[0].classes
          .filter(schoolClass => !this.classId || schoolClass.id === this.classId)[0].averageStudiedTime
      }),
    })
  }

  init = action((schoolId, classId) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.load();
  });

  validateResponse = () => {
    if (
      !this.data ||
      !this.data.length ||
      !this.data[0].classes ||
      !this.data[0].classes.length
    ) {
      return false;
    }
    return true;
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
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const lastWeekAverageStudiedTimeService = new LastWeekAverageStudiedTimeService();

export default lastWeekAverageStudiedTimeService;
