import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class SchoolClassRecordListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
      schoolClasses: [],
    });
  }

  init = action((schoolId) => {
    this.schoolClasses = [];
    this.schoolId = schoolId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/records/schools/${this.schoolId}/school-classes`,
    }).then(() => {
      if (this.fetch.data) {
        this.schoolClasses = this.fetch.data;
      } else {
        this.schoolClasses = [];
      }
    });
  });

}

const schoolClassRecordListService = new SchoolClassRecordListService();

export default schoolClassRecordListService;
