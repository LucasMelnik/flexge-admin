import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudyQualityDashboardService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      loadingStudyQualityScores: true,
      schoolStudyQualityScores: [],
      loadingStudyQualityGroups: true,
      schoolStudyQualityGroups: {},
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

  loadStudyQualityGroups = action(() => {
    this.loadingStudyQualityGroups = true;
    this.fetch.fetch({
      url: '/reports/study-quality-groups',
    }).then(() => {
      if (this.fetch.data) {
        this.schoolStudyQualityGroups = this.fetch.data;
      }
      this.loadingStudyQualityGroups = false;
    });
  });
}

const studyQualityDashboardService = new StudyQualityDashboardService();

export default studyQualityDashboardService;
