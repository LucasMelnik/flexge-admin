import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class AverageStudyQualityService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      studyQualityAverages: [],
      allSchoolsAverage: computed(() => {
        if (!this.validateResponse()) return null;
        const total = this.studyQualityAverages.reduce((acc, school) => (
          acc + school.schoolAverageScore
        ), 0);
        return total / this.studyQualityAverages.length;
      }),
      averageByClass: computed(() => {
        if (!this.validateResponse()) return null;
        const total = this.studyQualityAverages[0].classes.reduce((acc, schoolClass) => (
          acc + schoolClass.classAverageScore
        ), 0);
        return total / this.studyQualityAverages[0].classes.length;
      }),
    });
  }

  validateResponse = () => {
    if (
      !this.studyQualityAverages ||
      !this.studyQualityAverages.length
    ) {
      return false;
    }
    return true;
  }

  loadStudyQualityScores = action(() => {
    this.fetch.fetch({
      url: '/reports/study-quality-average',
    }).then(() => {
      if (this.fetch.data) {
        this.studyQualityAverages = this.fetch.data;
      }
    });
  });
}

const averageStudyQualityService = new AverageStudyQualityService();

export default averageStudyQualityService;
