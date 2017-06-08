import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudentListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      students: [],
    });
  }

  load = action(() => {
    this.fetch.fetch({
      url: '/students',
      query: {
        page: 1,
        size: 100,
        // query: {
        //   company: companyId,
        // },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.students = this.fetch.data.docs;
      } else {
        this.students = [];
      }
    });
  });
}

const studentListService = new StudentListService();

export default studentListService;
