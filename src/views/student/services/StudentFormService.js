import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

export default class StudentFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      studentId: null,
      schoolId: null,
      classId: null,
    });
    this.form.validations = {
      name: [isRequired],
      email: [isRequired, isValidEmail],
    };
  }

  handleLoad = action((studentId, schoolId, classId) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.form.reset();
    if (studentId) {
      this.fetch.fetch({
        url: `/students/${studentId}`,
      }).then(() => {
        if (this.fetch.data) {
          const data = {
            ...this.fetch.data,
            ...this.fetch.data.currentCourse && {
              currentCourse: this.fetch.data.currentCourse.id,
            },
          };
          this.form.setInitialValues(data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.studentId = studentId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const studentId = this.form.getValue('id');
    this.submit.fetch({
      method: studentId ? 'put' : 'post',
      url: studentId ? `/students/${studentId}` : `/schools/${this.schoolId}/classes/${this.classId}/students`,
      body: {
        ...this.form.getValues(),
        schoolClass: this.form.getValue('schoolClass.id'),
      },
    }).then(() => {
      if (this.submit.data) {
        const student = this.submit.data;
        this.studentId = student.id;
        this.form.reset();
        browserHistory.goBack();
        NotificationService.addNotification(
          `Student ${studentId ? 'updated' : 'created'} successfully.`,
          'success',
        );
      }
      if (this.submit.error) {
        if (this.submit.error && this.submit.error.indexOf('E11000') > -1) {
          NotificationService.addNotification(
            'We already have a student with this email.',
            'error',
          );
        } else {
          NotificationService.addNotification(
            `Error ${studentId ? 'updating' : 'creating'} student.`,
            'error',
          );
        }
      }
    });
  })
}
