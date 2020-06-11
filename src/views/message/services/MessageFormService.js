import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';
import { Roles } from '../../../core/util';

export default class MessageFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {});
    this.form.validations = {
      type: [isRequired],
      subject: [isRequired],
      text: [isRequired],
      school: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER].some(r => r === localStorage.role) ? [isRequired] : [],
      schoolClasses: [isRequired],
      students: [(value, all) => !value && all.type !== 'TO_CLASSROOM' && 'Required'],
    };

    this.form.setInitialValues({
      type: 'TO_ONE_STUDENT',
    });

    if ([Roles.SCHOOL_MANAGER, Roles.TEACHER].some(r => r === localStorage.role)) {
      this.form.setValue('school', localStorage.getItem('school'));
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
        ...this.form.getValue('type') !== 'TO_CLASSROOM' && {
          students: this.form.getValue('students'),
        },
        schoolClasses: this.form.getValue('schoolClasses'),
        type: this.form.getValue('type') === 'TO_ONE_STUDENT' ? 'TO_STUDENTS' : this.form.getValue('type'),
      },
    }).then(() => {
      if (this.submit.data) {
        NotificationService.addNotification('Message successfully sent.', 'success');
        browserHistory.push('/messages');
      }
      if (this.submit.error) {
        NotificationService.addNotification('Error to send the message', 'error');
      }
    });
  });
}
