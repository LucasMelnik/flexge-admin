import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudentAcademicPerformanceHistoryService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      history: [],
    });
  }

  handleLoad = action((idStudent) => {
    this.fetch.fetch({
      url: `/records/students/${idStudent}/courses-overview`,
    }).then(() => {
      if (this.fetch.data) {
        this.history = this.fetch.data;
      } else {
        this.history = [];
      }
    });
  });
}

const studentAcademicPerformanceHistoryService = new StudentAcademicPerformanceHistoryService();

export default studentAcademicPerformanceHistoryService;
