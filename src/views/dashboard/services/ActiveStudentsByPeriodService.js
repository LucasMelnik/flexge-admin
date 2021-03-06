import { action, extendObservable, computed } from 'mobx';
import get from 'lodash/get';
import { formatTimeFromSeconds } from '../../../core/util';
import FetchService from '../../../core/services/FetchService';
import filterList from './filterList';

class ActiveStudentsByPeriodService {
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
            acc + periods.reduce((classAcc, period) => classAcc + schoolClass[`studyOnLast${period}Days`].length || 0, 0)
          ), 0)
        ), 0);

        return (activeStudents / this.totalStudents) * 100;
      }),
      totalSchoolStudents: computed(() => (
        this.data.reduce((acc, school) => acc + school.totalStudents, 0)
      )),
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
        const periods = [7, 14, 21, 30];
        const activeStudents = filterList(this.data, this.schoolId)
          .reduce((acc, school) => (
            acc + periods.reduce((periodAcc, period) => (
              periodAcc + school[`studyOnLast${period}Days`]
            ), 0)
          ), 0);
        return (activeStudents / this.totalSchoolStudents) * 100;
      }),
      studiedLast7Days: computed(() => {
        if (!this.validateResponse()) return null;
        const activeStudentsLast7Days = filterList(this.data, this.schoolId)
          .reduce((acc, school) => (
            acc + this.getdata(school.classes, 'studyOnLast7Days')
          ), 0);
        return (activeStudentsLast7Days / this.totalStudents) * 100;
      }),
      schoolAverageLast7Days: computed(() => {
        if (!this.validateResponse()) return null;
        const studyingLast7days = filterList(this.data, this.schoolId)
          .reduce((acc, school) => acc + school.studyOnLast7Days, 0);
        return (studyingLast7days / this.totalSchoolStudents) * 100;
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
            details: filterList(this.data, this.schoolId)
              .reduce((schoolAcc, school) => [...schoolAcc, ...get(school, 'classes', []).reduce((acc, item) => [...acc, ...item[period]], [])], [])
              .map(item => ({
                ...item,
                value: formatTimeFromSeconds(item.totalStudiedTime, 'hh:mm:ss'),
              })),
          })),
          {
            value: totalDidntStudy,
            rate: (totalDidntStudy / this.totalStudents) * 100,
            details: filterList(this.data, this.schoolId)
              .reduce((schoolAcc, school) => [...schoolAcc, ...get(school, 'classes', []).reduce((acc, item) => [...acc, ...item.noStudy], [])], [])
              .map(item => ({
                ...item,
                value: formatTimeFromSeconds(item.totalStudiedTime, 'hh:mm:ss'),
              })),
          },
        ];
      }),
    });
  }

  getdata = (classes, key) => (
    filterList(classes, this.classId).reduce((acc, schoolClass) => (
      acc + schoolClass[key].length
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

  init = action((schoolId, classId, query) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.load(query);
  });

  load = action((query) => {
    this.data = [];
    this.fetch.fetch({
      url: '/reports/active-students-by-week',
      query
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const activeStudentsByPeriodService = new ActiveStudentsByPeriodService();

export default activeStudentsByPeriodService;
