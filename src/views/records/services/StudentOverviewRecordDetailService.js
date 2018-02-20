import { action, extendObservable, toJS } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';

class StudentOverviewRecordDetailService {
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
            this.student = {
              ...student,
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

const studentOverviewRecordDetailService = new StudentOverviewRecordDetailService();

export default studentOverviewRecordDetailService;
