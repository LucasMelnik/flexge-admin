import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class PerformanceGoalService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      loadingStudyQualityScores: true,
      schoolStudyQualityScores: [],
    });
  }

  loadStudyQualityAverage = action(() => {
    this.loadingStudyQualityScores = true;
    this.fetch.fetch({
      url: '/reports/study-quality-average',
    }).then(() => {
      if (this.fetch.data) {
        this.schoolStudyQualityScores = this.fetch.data;
      }
      this.loadingStudyQualityScores = false;
    });
  });
}

const performanceGoalService = new PerformanceGoalService();

export default performanceGoalService;
