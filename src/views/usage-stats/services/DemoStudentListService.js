import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class DemoStudentListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      students: [],
    });
  }

  init = action(() => {
    this.students = [];
  });

  load = action((month, distributor) => {
    this.fetch.fetch({
      url: `/reports/${month.format('MM-YYYY')}/demo-students?distributor=${distributor}`,
    }).then(() => {
      if (this.fetch.data) {
        this.students = this.fetch.data;
      } else {
        this.students = [];
      }
    });
  });
}

const demoStudentListService = new DemoStudentListService();

export default demoStudentListService;
