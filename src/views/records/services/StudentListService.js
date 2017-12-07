import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudentListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      students: [],
    });
  }

  searchStudents = action((search) => {
    this.fetch.fetch({
      url: '/students',
      query: {
        query: {
          name: {
            $regex: search,
            $options: 'i',
          },
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

const studentListService = new StudentListService();

export default studentListService;
