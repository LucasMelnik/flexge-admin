import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudentRecordDetailService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      studentId: null,
      classId: null,
      contents: [],
    });
  }

  init = action((studentId) => {
    this.studentId = studentId;
    this.loadByDates();
  });

  loadByDates = action(() => {
    this.fetch.fetch({
      url: `/reports/students/${this.studentId}/date-details`,
    }).then(() => {
      if (this.fetch.data) {
        this.contents = this.fetch.data;
      } else {
        this.contents = [];
      }
    });
  });
}

const studentRecordDetailService = new StudentRecordDetailService();

export default studentRecordDetailService;
