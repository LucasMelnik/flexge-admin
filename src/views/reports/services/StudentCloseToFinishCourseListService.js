import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class StudentCloseToFinishCourseListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      students: [],
    });
    this.form.validations = {
      school: [],
      schoolClass: [],
    };
  }

  init = action(() => {
    this.students = [];
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      this.form.setValue('school', localStorage.getItem('school'));
    }
  });

  load = action(() => {
    this.form.submitted = true;
    this.fetch.fetch({
      url: '/reports/students-close-to-finish-course',
      query: {
        ...this.form.getValue('school') && {
          school: this.form.getValue('school'),
        },
        ...this.form.getValue('schoolClass') && {
          schoolClass: this.form.getValue('schoolClass'),
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

const studentCloseToFinishCourseListService = new StudentCloseToFinishCourseListService();

export default studentCloseToFinishCourseListService;
