import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

export default class StudentDetailService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      student: {
        studyQuality: {},
        currentCourse: {},
        schoolClass: {},
      },
    });
  }

  handleLoad = action((idStudent) => {
    this.fetch.fetch({
      url: `/students/${idStudent}`,
    }).then(() => {
      if (this.fetch.data) {
        this.student = this.fetch.data;
      } else {
        this.student = {};
      }
    });
  });
}
