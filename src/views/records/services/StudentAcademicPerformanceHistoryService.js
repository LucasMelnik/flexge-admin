import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';
import { englishLevelCourses } from '../../../core/consts';

class StudentAcademicPerformanceHistoryService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      history: [],
      currentPerformance: {},
    });
  }

  handleLoad = action((idStudent) => {
    this.fetch.fetch({
      url: `/records/students/${idStudent}/courses-overview`,
    }).then(() => {
      if (this.fetch.data) {
        const dataWithLevel = this.fetch.data.map(course => ({
          ...course,
          level: englishLevelCourses.find(englishLevel => englishLevel.label === course.name).value,
        }));
        console.log(dataWithLevel)
        this.history = orderBy(dataWithLevel, 'level', 'desc');
        this.currentPerformance = this.fetch.data.find(performance => !performance.completedAt);
      } else {
        this.history = [];
        this.currentPerformance = {};
      }
    });
  });
}

const studentAcademicPerformanceHistoryService = new StudentAcademicPerformanceHistoryService();

export default studentAcademicPerformanceHistoryService;
