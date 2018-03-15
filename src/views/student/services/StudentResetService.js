import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import NotificationService from '../../../core/services/NotificationService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

export default class StudentResetService {
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      studentId: null,
    });
  }

  init = action((studentId) => {
    this.studentId = studentId;
  });

  handleReset = action(() => {
    ConfirmationDialogService.show(
      'Reset Student',
      'You are about to reset the Student, after that the student will need to finish a new placement test or you need to manually set the course. Do you want to continue ?',
      () => {
        this.submit.fetch({
          url: `/students/${this.studentId}/reset-course`,
          method: 'post',
        }).then(() => {
          if (this.submit.data) {
            window.location.reload();
            NotificationService.addNotification(
              'Successfully reset Student',
              'success',
            );
          }
          if (this.submit.error) {
            NotificationService.addNotification(
              'Error to reset the Student',
              'error',
            );
          }
        });
      });
  })
}
