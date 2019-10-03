import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';

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

        this.history = orderBy(this.fetch.data, ['academicPlan', 'placementLevel.level'], ['asc', 'desc']).map(course => ({
          ...course,
          coursePercentage: (
            course.conqueredListeningPoints +
            course.conqueredReadingPoints +
            course.conqueredSpeakingPoints +
            course.conqueredWritingPoints
          ) / (
            course.listeningPoints + course.readingPoints + course.speakingPoints + course.writingPoints
          ),
        }));
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
