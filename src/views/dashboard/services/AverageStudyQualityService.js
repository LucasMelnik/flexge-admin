import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class AverageStudyQualityService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
      schoolId: null,
      classId: null,
      allSchoolsAverage: computed(() => {
        if (!this.validateResponse()) return null;
        const total = this.data.reduce((acc, school) => (
          acc + school.schoolAverageScore
        ), 0);
        return total / this.data.length;
      }),
      averageByClass: computed(() => {
        if (!this.validateResponse()) return 0;
        const total = this.data
          .filter(school => !this.schoolId || school.id === this.schoolId)[0].classes
          .filter(schoolClass => !this.classId || schoolClass.id === this.classId)
          .reduce((acc, schoolClass) => (
            acc + schoolClass.classAverageScore
          ), 0);
        return this.classId ? total :
          total / this.data.reduce((acc, school) => acc + school.classes.length, 0);
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

  init = action((schoolId, classId) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.load();
  });

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
