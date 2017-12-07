import { action } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class ActiveStudentsByWeekService {
  fetch = new FetchService();

  // constructor() {
  //   extendObservable(this, {
  //     loadingStudyQualityScores: true,
  //     schoolStudyQualityScores: [],
  //     loadingStudyQualityGroups: true,
  //     schoolStudyQualityGroups: {},
  //   });
  // }

  load = action(() => {
    this.loadingStudyQualityScores = true;
    this.fetch.fetch({
      url: '/reports/active-students-by-week',
    }).then(() => {
      if (this.fetch.data) {
        this.schoolStudyQualityScores = this.fetch.data;
      }
      this.loadingStudyQualityScores = false;
    });
  });
}

const activeStudentsByWeekService = new ActiveStudentsByWeekService();

export default activeStudentsByWeekService;
