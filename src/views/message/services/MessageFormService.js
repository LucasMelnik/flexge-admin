import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class MessageFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {});
    this.form.validations = {
      subject: [isRequired],
      text: [isRequired],
      school: (localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER' || localStorage.role === 'COMPANY_MANAGER') ? [isRequired] : [],
      schoolClasses: [isRequired],
      students: [(value, all) => !value && all.forStudents && 'Required'],
    };

    this.form.setInitialValues({
      forStudents: false,
    });

    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      const school = JSON.parse(localStorage.getItem('school'));
      this.form.setValue('school', school._id);
    }
  }

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    this.submit.fetch({
      method: 'post',
      url: '/messages',
      body: {
        text: this.form.getValue('text'),
        subject: this.form.getValue('subject'),
        ...this.form.getValue('forStudents') && {
          students: this.form.getValue('students'),
        },
        schoolClasses: this.form.getValue('schoolClasses'),
        type: this.form.getValue('forStudents') ? 'TO_STUDENTS' : 'TO_CLASSROOM',
      },
    }).then(() => {
      if (this.submit.data) {
        NotificationService.addNotification('Message successfully sent.', 'success');
        browserHistory.push('/messages');
      }
      if (this.submit.error) {
        NotificationService.addNotification('Erro to send the message', 'error');
      }
    });
  });
}
