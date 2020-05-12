import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class CourseStudentCountListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      courses: [],
    });
    this.form.validations = {
      school: [],
      schoolClass: [],
    };
  }

  init = action(() => {
    this.courses = [];
    if (localStorage.role === 'SCHOOL_MANAGER' || localStorage.role === 'TEACHER') {
      this.form.setValue('school', localStorage.getItem('school'));
    }
  });

  load = action(() => {
    this.form.submitted = true;
    this.fetch.fetch({
      url: '/reports/course-student-count',
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
        this.courses = this.fetch.data;
      } else {
        this.courses = [];
      }
    });
  });
}

const courseStudentCountListService = new CourseStudentCountListService();

export default courseStudentCountListService;
