import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';

class ReactivateStudentListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      students: [],
      name: '',
      email: '',
      schoolId: null,
      filteredStudents: null,
    });
    this.form.validations = {
      course: [
        (course, values) => {
          const isEmpty = !Object.keys(values).length ||
            Object.keys(values).reduce((acc, key) => {
              if (!acc) return acc;
              return !values[key];
            }, true);
          if (isEmpty) return 'Inform at least one field';
          return null;
        },
      ],
    };
  }

  init = action((schoolId) => {
    this.name = '';
    this.email = '';
    this.schoolId = schoolId;
    this.students = [];
    if (this.schoolId) {
      this.load();
    }
  });

  load = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill at least one filter', 'error');
      return;
    }
    this.fetch.fetch({
      url: '/students',
      query: {
        query: {
          removedAt: { $ne: null },
          ...this.form.getValue('name') && {
            name: {
              $regex: this.form.getValue('name'),
              $options: 'i',
            },
          },
          ...this.form.getValue('email') && {
            email: {
              $regex: this.form.getValue('email'),
              $options: 'i',
            },
          },
          ...this.form.getValue('school') && {
            school: this.form.getValue('school'),
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

const reactivateStudentListService = new ReactivateStudentListService();

export default reactivateStudentListService;
