import { browserHistory } from 'react-router';
import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';
import ReviewListService from './ReviewListService';
import { isRequired } from '../../../core/validations';

class ContentReviewService {
  submit = new FetchService();
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    this.form.validations = {
      comments: [isRequired],
    };
    extendObservable(this, {
      reviewId: null,
      unitId: null,
    });
  }

  init = action((reviewId, unitId) => {
    this.reviewId = reviewId;
    this.unitId = unitId;
    this.handleLoad();
  });

  handleLoad = action(() => {
    if (this.reviewId) {
      this.fetch.fetch({
        url: `/reviews/${this.reviewId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.reset();
    }
  });

  handleSendToReview = action((unit) => {
    ConfirmationDialogService.show(
      'Send to review',
      `You are about to send the unit "${unit.name}" to review, Do you want to continue ?`,
      () => {
        this.submit.fetch({
          method: 'post',
          url: '/reviews',
          body: {
            status: 'PENDING',
            statusFormat: 'PENDING',
            statusImage: 'NOT_SEND_TO_REVIEW',
            unit: unit.id,
          },
        }).then((res) => {
          if (res) {
            ReviewListService.handleMyUnits(true);
            ReviewListService.handleAllUnits(true);
            NotificationService.addNotification(
              'Review sent successfully.',
              'success',
            );
          }
          if (this.submit.error) {
            NotificationService.addNotification(
              'Error creating review.',
              'error',
            );
          }
        });
      });
  });

  handleSendToPending = action(() => {
    ConfirmationDialogService.show(
      'Send to pending status',
      'This means you already fixed all notes, Do you want to continue ?',
      () => {
        this.submit.fetch({
          method: 'put',
          url: `/reviews/${this.reviewId}`,
          body: {
            status: 'PENDING',
            unit: this.unitId,
            comments: this.form.getValue('comments'),
          },
        }).then((res) => {
          if (res) {
            ReviewListService.handleMyUnits(true);
            ReviewListService.handleAllUnits(true);
            browserHistory.push('/reviews');
            NotificationService.addNotification(
              'Status changed successfully.',
              'success',
            );
          }
          if (this.submit.error) {
            NotificationService.addNotification(
              'Error changing status review.',
              'error',
            );
          }
        });
      });
  });

  handleSendToReviewed = action(() => {
    this.form.setSubmitted();
    const comments = this.form.getValue('comments');
    if (this.form.errors || comments.length === 0 || comments === '<p><br></p>') {
      NotificationService.addNotification(
        'Please leave a comment to mark as reviewed',
        'error',
      );
      return;
    }

    ConfirmationDialogService.show(
      'Unit reviewed',
      'If you already have verified and commented on this unit, please confirm.',
      () => {
        this.submit.fetch({
          method: 'put',
          url: `/reviews/${this.reviewId}`,
          body: {
            status: 'REVIEWED',
            unit: this.unitId,
            comments: this.form.getValue('comments'),
          },
        }).then((res) => {
          if (res) {
            this.handleLoad();
            browserHistory.push('/reviews');
            NotificationService.addNotification(
              'Unit reviewed successfully.',
              'success',
            );
          }
          if (this.submit.error) {
            NotificationService.addNotification(
              'Error reviewing unit.',
              'error',
            );
          }
        });
      });
  });

  handleSendToDone = action(() => {
    this.form.setSubmitted();
    const comments = this.form.getValue('comments');
    if (this.form.errors || comments.length === 0 || comments === '<p><br></p>') {
      NotificationService.addNotification(
        'Please leave a comment to mark as done',
        'error',
      );
      return;
    }
    ConfirmationDialogService.show(
      'Unit Done',
      'This means you already fixed all comments or the unit was correct, and cannot be reverted. Are you sure you want to confirm?',
      () => {
        this.submit.fetch({
          method: 'put',
          url: `/reviews/${this.reviewId}`,
          body: {
            status: 'DONE',
            unit: this.unitId,
            comments: this.form.getValue('comments'),
          },
        }).then((res) => {
          if (res) {
            this.handleLoad();
            browserHistory.push('/reviews');
            NotificationService.addNotification(
              'Review done.',
              'success',
            );
          }
          if (this.submit.error) {
            NotificationService.addNotification(
              'Error changing status review.',
              'error',
            );
          }
        });
      });
  });
}

export default ContentReviewService;
