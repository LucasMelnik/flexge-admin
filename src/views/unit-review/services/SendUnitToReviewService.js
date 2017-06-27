import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';
import ReviewListService from './ReviewListService';
import { isRequired } from '../../../core/validations';

class SendUnitToReviewService {
  submit = new FetchService();
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    this.form.validations = {
      comments: [isRequired],
    };
  }

  handleLoad = (reviewId) => {
    if (reviewId) {
      this.fetch.fetch({
        url: `/reviews/${reviewId}`,
        query: {
          page: 1,
          size: 2000,
        },
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.reset();
    }
  };

  handleSendToReview = (unit) => {
    ConfirmationDialogService.show(
      'Send to review',
      `You are about to send the unit "${unit.name}" to review, Do you want to continue ?`,
      () => {
        this.submit.fetch({
          method: 'post',
          url: '/reviews',
          body: {
            status: 'PENDING',
            unit: unit.id,
          },
        }).then((res) => {
          if (res) {
            ReviewListService.handleMyUnits();
            ReviewListService.handleAllUnits();
            NotificationService.addNotification(
              'Review sent successfully.',
              null,
              null,
              'success',
            );
          }
          if (this.submit.error) {
            NotificationService.addNotification(
              'Error creating review.',
              null,
              null,
              'danger',
            );
          }
        });
      });
  };

  handleSendToReviewed = (unitId, reviewId) => {
    this.form.setSubmitted();
    if (this.form.errors) {
      return;
    }
    ConfirmationDialogService.show(
      'Unit reviewed',
      'If you already have verified and commented on this unit, please confirm.',
      () => {
        this.submit.fetch({
          method: 'put',
          url: `/reviews/${reviewId}`,
          body: {
            status: 'REVIEWED',
            unit: unitId,
            comments: this.form.getValue('comments'),
          },
        }).then((res) => {
          if (res) {
            this.handleLoad();
            browserHistory.push('/')
            NotificationService.addNotification(
              'Review created successfully.',
              null,
              null,
              'success',
            );
          }
          if (this.submit.error) {
            NotificationService.addNotification(
              'Error creating review.',
              null,
              null,
              'danger',
            );
          }
        });
      });
  };

  handleSendToDone = (unitId, reviewId) => {
    ConfirmationDialogService.show(
      'Unit Done',
      'This means you already fixed all comments, and cannot be reverted. Are you sure you want to confirm?',
      () => {
        this.submit.fetch({
          method: 'put',
          url: `/reviews/${reviewId}`,
          body: {
            status: 'DONE',
            unit: unitId,
          },
        }).then((res) => {
          if (res) {
            this.handleLoad();
            browserHistory.push('/')
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
              'danger',
            );
          }
        });
      });
  };
}

export default SendUnitToReviewService;
