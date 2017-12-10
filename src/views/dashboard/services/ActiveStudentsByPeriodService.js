import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class ActiveStudentsByPeriodService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      ActiveStudentsByPeriod: [],
      totalActiveStudents: computed(() => {
        if (!this.validateResponse()) return null;
        const periods = [7, 14, 21, 30];
        const activeStudents = this.ActiveStudentsByPeriod.reduce((schoolAcc, school) => (
          schoolAcc + school.classes.reduce((acc, schoolClass) => (
            acc + periods.reduce((classAcc, period) => classAcc + schoolClass[`studyOnLast${period}Days`] || 0, 0)
          ), 0)
        ), 0);
        return activeStudents / this.totalStudents * 100;
      }),
      totalStudents: computed(() => {
        if (!this.validateResponse()) return null;
        return this.ActiveStudentsByPeriod.reduce((schoolAcc, school) => (
          schoolAcc + school.classes.reduce((acc, schoolClass) => (
            acc + schoolClass.totalStudents
          ), 0)
        ), 0);
      }),
      schoolAverage: computed(() => {
        if (!this.validateResponse()) return null;
        const studyingStudents =
          this.ActiveStudentsByPeriod[0].totalStudents -
          this.ActiveStudentsByPeriod[0].noStudy;
        return studyingStudents / this.ActiveStudentsByPeriod[0].totalStudents * 100;
      }),
      studiedLast7Days: computed(() => {
        if (!this.validateResponse()) return null;
        const activeStudentsLast7Days = this.ActiveStudentsByPeriod.reduce((acc, school) => (
          acc + this.getActiveStudentsByPeriod(school.classes, 'studyOnLast7Days')
        ), 0);
        return activeStudentsLast7Days / this.totalStudents * 100;
      }),
      averageByPeriod: computed(() => {
        if (!this.validateResponse()) return null;
        const periods = [7, 14, 21, 30];
        const activeStudentsByPeriod = this.ActiveStudentsByPeriod.reduce((acc, school) => {
          periods.forEach((period) => {
            const periodKey = `studyOnLast${period}Days`;
            acc[periodKey] = acc[periodKey] ?
              acc[periodKey] + this.getActiveStudentsByPeriod(school.classes, periodKey) :
              this.getActiveStudentsByPeriod(school.classes, periodKey);
          });
          return acc;
        }, {});
        //Return total by period and total that didn't study
        return [
          ...Object.keys(activeStudentsByPeriod).map(period => activeStudentsByPeriod[period] / this.totalStudents * 100),
          this.totalStudents - Object.keys(activeStudentsByPeriod).reduce((acc, period) => acc + activeStudentsByPeriod[period], 0),
        ];
      }),
    });
  }

  getActiveStudentsByPeriod = (classes, key) => (
    classes.reduce((acc, schoolClass) => (
      acc + schoolClass[key]
    ), 0)
  )

  validateResponse = () => {
    if (
      !this.ActiveStudentsByPeriod ||
      !this.ActiveStudentsByPeriod.length ||
      !this.ActiveStudentsByPeriod[0].classes ||
      !this.ActiveStudentsByPeriod[0].classes.length
    ) {
      return false;
    }
    return true;
  }

  load = action(() => {
    this.ActiveStudentsByPeriod = [];
    this.fetch.fetch({
      url: '/reports/active-students-by-week',
    }).then(() => {
      if (this.fetch.data) {
        this.ActiveStudentsByPeriod = this.fetch.data;
      }
    });
  });
}

const activeStudentsByPeriodService = new ActiveStudentsByPeriodService();

export default activeStudentsByPeriodService;
