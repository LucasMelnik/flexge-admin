import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class AverageStudyQualityService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
      allSchoolsAverage: computed(() => {
        if (!this.validateResponse()) return null;
        const total = this.data.reduce((acc, school) => (
          acc + school.schoolAverageScore
        ), 0);
        return total / this.data.length;
      }),
      averageByClass: computed(() => {
        if (!this.validateResponse()) return null;
        const total = this.data[0].classes.reduce((acc, schoolClass) => (
          acc + schoolClass.classAverageScore
        ), 0);
        return total / this.data[0].classes.length;
      }),
    });
  }

  validateResponse = () => {
    if (
      !this.data ||
      !this.data.length
    ) {
      return false;
    }
    return true;
  }

  load = action(() => {
    this.fetch.fetch({
      url: '/reports/study-quality-average',
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const averageStudyQualityService = new AverageStudyQualityService();

export default averageStudyQualityService;
