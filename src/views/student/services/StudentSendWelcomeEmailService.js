import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import NotificationService from '../../../core/services/NotificationService';

export default class StudentSendWelcomeEmailService {
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      studentId: null,
    });
  }

  init = action((studentId) => {
    this.studentId = studentId;
  });

  handleSend = action(() => {
    this.submit.fetch({
      url: `/students/${this.studentId}/welcome-email`,
      method: 'post',
    }).then(() => {
      if (this.submit.data) {
        NotificationService.addNotification('An email with the new password was sent.', 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to send the new password',
          'error',
        );
      }
    });
  })
}
