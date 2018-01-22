import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import filterList from './filterList';

class ActiveStudentsByPeriodAndClassService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
      schoolId: null,
      classId: null,
      totalActiveStudents: computed(() => {
        if (!this.validateResponse()) return null;
        const periods = [7, 14, 21, 30];
        const activeStudents = filterList(this.data, this.schoolId).reduce((schoolAcc, school) => (
          schoolAcc + filterList(school.classes, this.classId).reduce((acc, schoolClass) => (
            acc + periods.reduce((classAcc, period) => classAcc + schoolClass[`studyOnLast${period}Days`] || 0, 0)
          ), 0)
        ), 0);
        return (activeStudents / this.totalStudents) * 100;
      }),
      totalStudents: computed(() => {
        if (!this.validateResponse()) return null;
        return filterList(this.data, this.schoolId).reduce((schoolAcc, school) => (
          schoolAcc + filterList(school.classes, this.classId).reduce((acc, schoolClass) => (
            acc + schoolClass.totalStudents
          ), 0)
        ), 0);
      }),
      schoolAverage: computed(() => {
        if (!this.validateResponse()) return null;
        const studyingStudents =
          this.data[0].totalStudents -
          this.data[0].noStudy;
        return (studyingStudents / this.data[0].totalStudents) * 100;
      }),
      studiedLast7Days: computed(() => {
        if (!this.validateResponse()) return null;
        const activeStudentsLast7Days = filterList(this.data, this.schoolId)
          .reduce((acc, school) => (
            acc + this.getdata(school.classes, 'studyOnLast7Days')
          ), 0);
        return (activeStudentsLast7Days / this.totalStudents) * 100;
      }),
      averageByPeriod: computed(() => {
        if (!this.validateResponse()) return null;
        const periods = [7, 14, 21, 30];
        const activeStudentsByPeriod = filterList(this.data, this.schoolId)
          .reduce((acc, school) => {
            periods.forEach((period) => {
              const periodKey = `studyOnLast${period}Days`;
              acc[periodKey] = acc[periodKey] ?
                acc[periodKey] + this.getdata(school.classes, periodKey) :
                this.getdata(school.classes, periodKey);
            });
            return acc;
          }, {});
        // Return total by period and total that didn't study
        const totalDidntStudy = this.totalStudents - Object.keys(activeStudentsByPeriod).reduce((acc, period) => acc + activeStudentsByPeriod[period], 0);
        return [
          ...Object.keys(activeStudentsByPeriod).map(period => ({
            value: activeStudentsByPeriod[period],
            rate: (activeStudentsByPeriod[period] / this.totalStudents) * 100,
          })),
          {
            value: totalDidntStudy,
            rate: (totalDidntStudy / this.totalStudents) * 100,
          },
        ];
      }),
    });
  }

  getdata = (classes, key) => (
    filterList(classes, this.classId).reduce((acc, schoolClass) => (
      acc + schoolClass[key]
    ), 0)
  );

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
  };

  init = action((schoolId, classId) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.load();
  });

  load = action(() => {
    this.data = [];
    this.fetch.fetch({
      url: `/reports/schools/${this.schoolId}/classes/${this.classId}/active-students-by-week`,
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const activeStudentsByPeriodAndClassService = new ActiveStudentsByPeriodAndClassService();

export default activeStudentsByPeriodAndClassService;
