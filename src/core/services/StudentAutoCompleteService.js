import { action, extendObservable } from 'mobx';
import FetchService from './FetchService';

class StudentAutoCompleteService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      students: [],
    });
  }

  searchStudents = action((search) => {
    if (!search || search.length < 4) {
      return;
    }

    this.fetch.fetch({
      url: '/autocomplete-students',
      query: {
        size: 15,
        page: 0,
        query: {
          criteria: search,
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

export default StudentAutoCompleteService;
