import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class ContentReviewService {
  submit = new FetchService();
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    this.form.validations = {
      'review.contentComments': [isRequired],
    };
    extendObservable(this, {
      moduleId: null,
      masteryTestId: null,
    });
  }

  init = action((moduleId, masteryTestId) => {
    this.moduleId = moduleId;
    this.masteryTestId = masteryTestId;
    this.handleLoad();
  });

  handleLoad = action(() => {
    this.fetch.fetch({
      url: `/modules/${this.moduleId}/mastery-tests/${this.masteryTestId}`,
    }).then(() => {
      if (this.fetch.data) {
        this.form.setInitialValues(this.fetch.data);
      }
    });
  });

  handleSendToPending = action(() => {
    ConfirmationDialogService.show(
      'Send to pending status',
      'This means you already fixed all notes, Do you want to continue ?',
      () => {
        this.submit.fetch({
          method: 'put',
          url: `/modules/${this.moduleId}/mastery-tests/${this.masteryTestId}`,
          body: {
            ...this.form.getValues(),
          },
        }).then((res) => {
          if (res) {
            NotificationService.addNotification(
              'Status changed successfully.',
              null,
              null,
              'success',
            );
          }
          if (this.submit.error) {
            NotificationService.addNotification(
              'Error changing status review.',
              null,
              null,
              'error',
            );
          }
        });
      });
  });

  handleSendToNotApproved = action(() => {
    this.form.setSubmitted();
    const comments = this.form.getValue('review.contentComments');
    if (this.form.errors || comments.length === 0 || comments === '<p><br></p>') {
      NotificationService.addNotification(
          'Please leave a comment to mark as reviewed',
           null,
           null,
           'error',
        );
      return;
    }

    ConfirmationDialogService.show(
      'Mastery Test reviewed',
      'If you already have verified and commented on this unit, please confirm.',
      () => {
        this.submit.fetch({
          method: 'put',
          url: `/modules/${this.moduleId}/mastery-tests/${this.masteryTestId}`,
          body: {
            ...this.form.getValues(),
          },
        }).then((res) => {
          if (res) {
            this.handleLoad();
            NotificationService.addNotification(
              'Mastery Test reviewed successfully.',
              null,
              null,
              'success',
            );
          }
          if (this.submit.error) {
            NotificationService.addNotification(
              'Error reviewing unit.',
              null,
              null,
              'error',
            );
          }
        });
      });
  });

  handleSendToApproved = action(() => {
    this.form.setSubmitted();
    const comments = this.form.getValue('review.contentComments');
    if (this.form.errors || comments.length === 0 || comments === '<p><br></p>') {
      NotificationService.addNotification(
         'Please leave a comment to mark as done',
          null,
          null,
          'error',
      );
      return;
    }
    ConfirmationDialogService.show(
      'Mastery Test Done',
      'This means you already fixed all comments or the unit was correct, and cannot be reverted. Are you sure you want to confirm?',
      () => {
        this.submit.fetch({
          method: 'put',
          url: `/modules/${this.moduleId}/mastery-tests/${this.masteryTestId}`,
          body: {
            ...this.form.getValues(),
          },
        }).then((res) => {
          if (res) {
            this.handleLoad();
            NotificationService.addNotification(
              'Review done.',
              null,
              null,
              'success',
            );
          }
          if (this.submit.error) {
            NotificationService.addNotification(
              'Error changing status review.',
              null,
              null,
              'error',
            );
          }
        });
      });
  });
}

export default ContentReviewService;
