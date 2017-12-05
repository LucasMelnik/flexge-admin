import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudyQualityDashboardService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      loadingStudyQualityScores: true,
      schoolStudyQualityScores: [],
    });
  }

  loadStudyQualityScores = action(() => {
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

const studyQualityDashboardService = new StudyQualityDashboardService();

export default studyQualityDashboardService;
