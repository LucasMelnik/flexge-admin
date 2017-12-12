import { action, extendObservable } from 'mobx';
import moment from 'moment';
import round from 'lodash/round';
import FetchService from '../../../core/services/FetchService';

export default class StudentOverviewRecordDetailService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      student: {
        studyQuality: {},
        initialCourse: {},
        currentCourse: {},
        evaluation: {
          previewGrade: {},
        },
      },
    });
  }

  handleLoad = action((idStudent) => {
    this.fetch.fetch({
      url: `/records/students/${idStudent}/overview`,
    }).then(() => {
      if (this.fetch.data) {
        const levelDiff = (this.fetch.data.currentEnglishLevel - this.fetch.data.initialEnglishLevel);
        const monthDiff = moment().diff(moment(this.fetch.data.createdAt)) / (1000 * 60 * 60 * 24 * 30);
        const semiannualProgress = round((levelDiff / monthDiff) * 6, 2);

        this.student = {
          ...this.fetch.data,
          semiannualProgress,
          projection: 4 / (semiannualProgress / 6),
        };
      } else {
        this.student = {};
      }
    });
  });
}
