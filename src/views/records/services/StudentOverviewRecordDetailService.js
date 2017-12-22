import { action, extendObservable, toJS } from 'mobx';
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
        const student = this.fetch.data;

        const from = moment().subtract(4, 'week').startOf('isoWeeks').format('YYYY-MM-DD HH:mm:ss');
        const to = moment().endOf('isoWeeks').format('YYYY-MM-DD HH:mm:ss');

        this.fetch.fetch({
          url: `/reports/students/${idStudent}/week-stats-by-period?from=${from}&to=${to}`,
        }).then(() => {
          if (this.fetch.data) {
            const weeks = toJS(this.fetch.data);

            const levelDiff = (student.currentEnglishLevel - student.initialEnglishLevel);
            const monthDiff = moment().diff(moment(student.createdAt)) / (1000 * 60 * 60 * 24 * 30);
            const semiannualProgress = round((levelDiff / monthDiff) * 6, 2);

            this.student = {
              ...student,
              semiannualProgress,
              projection: 4 / (semiannualProgress / 6),
              averageStudiedTime: weeks.reduce((acc, week) => acc + week.totalStudiedTime, 0) / weeks.length,
            };
          } else {
            this.studiedTime = [];
          }
        });
      } else {
        this.student = {};
      }
    });
  });
}
