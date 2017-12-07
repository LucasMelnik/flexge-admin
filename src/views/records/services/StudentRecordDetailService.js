import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudentRecordDetailService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      studentId: null,
      classId: null,
      contents: [],
      contentsDetail: [],
    });
  }

  init = action((studentId) => {
    this.contents = [];
    this.contentsDetail = [];
    this.studentId = studentId;
    this.loadByDates();
    this.loadByContent();
  });

  loadByContent = action(() => {
    this.fetch.fetch({
      url: `/reports/students/${this.studentId}/content-details`,
    }).then(() => {
      if (this.fetch.data) {
        this.contentsDetail = this.fetch.data;
      } else {
        this.contentsDetail = [];
      }
    });
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
