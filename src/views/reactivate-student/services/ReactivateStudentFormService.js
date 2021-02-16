import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

export default class ReactivateStudentForm {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      studentId: null,
    });
    this.form.validations = {
      name: [isRequired],
      schoolClass: [isRequired],
      email: [isRequired, isValidEmail],
    };
  }

  handleLoad = action((studentId) => {
    this.form.reset();
    if (studentId) {
      this.fetch.fetch({
        url: `/students/${studentId}/deleted`,
      }).then(() => {
        if (this.fetch.data) {
          const data = {
            ...this.fetch.data,
            schoolClass: null,
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
      method: 'post',
      url: `/students/${studentId}/restore`,
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
          'Student successfully restored.',
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to restore the student.',
          'error',
        );
      }
    });
  })
}
