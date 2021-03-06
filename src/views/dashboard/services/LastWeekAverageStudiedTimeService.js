import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class LastWeekAverageStudiedTimeService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
      schoolId: null,
      classId: null,
      average: computed(() => {
        if (!this.data || !this.data.length) return null;
        const total = this.data
          .filter(school => !this.schoolId || school.id === this.schoolId)
          .reduce((acc, school) => (
            acc + school.classes
              .filter(schoolClass => !this.classId || schoolClass.id === this.classId)
              .reduce((classAcc, schoolClass) => classAcc + schoolClass.averageStudiedTime, 0)
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

  init = action((schoolId, classId, query) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.load(query);
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

  load = action((query) => {
    this.data = [];
    this.fetch.fetch({
      url: '/reports/last-week-average-studied-time',
      query,
    }).then(() => {
      this.data = this.fetch.data;
    });
  });
}

const lastWeekAverageStudiedTimeService = new LastWeekAverageStudiedTimeService();

export default lastWeekAverageStudiedTimeService;
