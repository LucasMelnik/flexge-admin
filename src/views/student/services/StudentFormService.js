import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

class StudentFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      studentId: null,
    });
    this.form.validations = {
      name: [isRequired],
      email: [isRequired, isValidEmail],
    };
  }

  handleLoad = action((studentId) => {
    this.form.reset();
    if (studentId) {
      this.fetch.fetch({
        url: `/students/${studentId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
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
      return;
    }
    const studentId = this.form.getValue('id');
    this.submit.fetch({
      method: studentId ? 'put' : 'post',
      url: studentId ? `/students/${studentId}` : '/students',
      body: this.form.getValues(),
    }).then(() => {
      if (this.submit.data) {
        const student = this.submit.data;
        browserHistory.push(`/students/${student.id}`);
        this.studentId = student.id;
        this.form.reset();
        this.form.setInitialValues(student);
        NotificationService.addNotification(
          `Student ${studentId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${studentId ? 'updating' : 'creating'} student.`,
          null,
          null,
          'danger',
        );
      }
    });
  })
}

const studentFormService = new StudentFormService();

export default studentFormService;
