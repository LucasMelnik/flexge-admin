import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import filterList from './filterList';

class WeeklyHoursStatsService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: {},
      schoolId: null,
      classId: null,
      value: computed(() => {
        if (!this.validateResponse()) return null;
        const totalStudents = filterList(this.data, this.schoolId)
          .reduce((acc, school) => {
            if (school.classes) {
              return acc + filterList(school.classes, this.classId)
                .reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
            }
            return acc;
          }, 0);
        const totalStudentsReachedTime = filterList(this.data, this.schoolId)
          .reduce((acc, school) => {
            if (school.classes) {
              return acc + filterList(school.classes, this.classId)
                .reduce((classAcc, schoolClass) => classAcc + schoolClass.reachedTime, 0);
            }
            return acc;
          }, 0);

        return (totalStudentsReachedTime / totalStudents) || 0;
      }),
      schoolAveragePercentage: computed(() => {
        if (!this.validateResponse()) return null;

        const totalStudents = filterList(this.data, this.schoolId)
          .reduce((acc, school) => acc + school.schoolCount, 0);
        const totalStudentsReachedTime = filterList(this.data, this.schoolId)
          .reduce((acc, school) => acc + school.schoolReachedTime, 0);

        return (totalStudentsReachedTime / totalStudents) || 0;
      }),
    });
  }

  validateResponse = () => this.data.length > 0;

  init= action((schoolId, classId, query) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.load(query);
  });

  load = action((query) => {
    this.fetch.fetch({
      url: '/reports/weekly-hours-stats',
      query
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const weeklyHoursStatsService = new WeeklyHoursStatsService();

export default weeklyHoursStatsService;
