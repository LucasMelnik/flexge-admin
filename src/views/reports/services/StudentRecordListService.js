import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudentRecordListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
      classId: null,
      students: [],
    });
  }

  init = action((schoolId, classId) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/reports/schools/${this.schoolId}/school-classes/${this.classId}/students`,
    }).then(() => {
      if (this.fetch.data) {
        this.students = this.fetch.data;
      } else {
        this.students = [];
      }
    });
  });
}

const studentRecordListService = new StudentRecordListService();

export default studentRecordListService;
