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
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/students',
      query: {
        query: {
          demoStudent: true,
        },
      },
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
