import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class dataService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
      totalActiveStudents: computed(() => {
        if (!this.validateResponse()) return 0;
        const periods = [7, 14, 21, 30];
        const activeStudents = this.data.reduce((schoolAcc, school) => (
          schoolAcc + school.classes.reduce((acc, schoolClass) => (
            acc + periods.reduce((classAcc, period) => classAcc + schoolClass[`studyOnLast${period}Days`] || 0, 0)
          ), 0)
        ), 0);
        return activeStudents / this.totalStudents * 100;
      }),
      totalStudents: computed(() => {
        if (!this.validateResponse()) return 0;
        return this.data.reduce((schoolAcc, school) => (
          schoolAcc + school.classes.reduce((acc, schoolClass) => (
            acc + schoolClass.totalStudents
          ), 0)
        ), 0);
      }),
      schoolAverage: computed(() => {
        if (!this.validateResponse()) return 0;
        const studyingStudents =
          this.data[0].totalStudents -
          this.data[0].noStudy;
        return studyingStudents / this.data[0].totalStudents * 100;
      }),
      studiedLast7Days: computed(() => {
        if (!this.validateResponse()) return 0;
        const activeStudentsLast7Days = this.data.reduce((acc, school) => (
          acc + this.getdata(school.classes, 'studyOnLast7Days')
        ), 0);
        return activeStudentsLast7Days / this.totalStudents * 100;
      }),
      averageByPeriod: computed(() => {
        if (!this.validateResponse()) return 0;
        const periods = [7, 14, 21, 30];
        const activeStudentsByPeriod = this.data.reduce((acc, school) => {
          periods.forEach((period) => {
            const periodKey = `studyOnLast${period}Days`;
            acc[periodKey] = acc[periodKey] ?
              acc[periodKey] + this.getdata(school.classes, periodKey) :
              this.getdata(school.classes, periodKey);
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

  getdata = (classes, key) => (
    classes.reduce((acc, schoolClass) => (
      acc + schoolClass[key]
    ), 0)
  )

  validateResponse = () => {
    if (
      !this.data ||
      !this.data.length ||
      !this.data[0].classes ||
      !this.data[0].classes.length
    ) {
      return false;
    }
    return true;
  }

  load = action(() => {
    this.data = [];
    this.fetch.fetch({
      url: '/reports/active-students-by-week',
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const activeStudentsByPeriodService = new dataService();

export default activeStudentsByPeriodService;
