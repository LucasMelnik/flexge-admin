import { action, extendObservable } from 'mobx';
import throttle from 'lodash/throttle';
import FetchService from '../../../core/services/FetchService';

class StudentListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      students: [],
    });
  }

  searchStudents = action(throttle((search) => {
    this.fetch.fetch({
      url: '/autocomplete-students',
      query: {
        size: 15,
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
  }, 2000));
}

const studentListService = new StudentListService();

export default studentListService;
