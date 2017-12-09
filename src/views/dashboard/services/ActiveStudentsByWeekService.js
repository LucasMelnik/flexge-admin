import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class ActiveStudentsByWeekService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      activeStudentsByWeek: [],
      totalActiveStudents: computed(() => {
        if (!this.validateResponse()) return null;
        const periods = [7, 14, 21, 30];
        const activeStudents = this.activeStudentsByWeek.reduce((schoolAcc, school) => (
          schoolAcc + school.classes.reduce((acc, schoolClass) => (
            acc + periods.reduce((classAcc, period) => classAcc + schoolClass[`studyOnLast${period}Days`] || 0, 0)
          ), 0)
        ), 0);
        return activeStudents / this.totalStudents * 100;
      }),
      totalStudents: computed(() => {
        if (!this.validateResponse()) return null;
        return this.activeStudentsByWeek.reduce((schoolAcc, school) => (
          schoolAcc + school.classes.reduce((acc, schoolClass) => (
            acc + schoolClass.totalStudents
          ), 0)
        ), 0);
      }),
      schoolAverage: computed(() => {
        if (!this.validateResponse()) return null;
        const studyingStudents =
          this.activeStudentsByWeek[0].totalStudents -
          this.activeStudentsByWeek[0].noStudy;
        return studyingStudents / this.activeStudentsByWeek[0].totalStudents * 100;
      }),
      studiedLast7Days: computed(() => {
        if (!this.validateResponse()) return null;
        const activeStudentsLast7Days = this.activeStudentsByWeek.reduce((acc, school) => (
          acc + this.getActiveStudentsByPeriod(school.classes, 'studyOnLast7Days')
        ), 0);
        return activeStudentsLast7Days / this.totalStudents * 100;
      }),
      averageByPeriod: computed(() => {
        if (!this.validateResponse()) return null;
        const periods = [7, 14, 21, 30];
        const activeStudentsByPeriod = this.activeStudentsByWeek.reduce((acc, school) => {
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
      !this.activeStudentsByWeek ||
      !this.activeStudentsByWeek.length ||
      !this.activeStudentsByWeek[0].classes ||
      !this.activeStudentsByWeek[0].classes.length
    ) {
      return false;
    }
    return true;
  }

  load = action(() => {
    this.activeStudentsByWeek = [];
    this.fetch.fetch({
      url: '/reports/active-students-by-week',
    }).then(() => {
      if (this.fetch.data) {
        this.activeStudentsByWeek = this.fetch.data;
      }
    });
  });
}

const activeStudentsByWeekService = new ActiveStudentsByWeekService();

export default activeStudentsByWeekService;
