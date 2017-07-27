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
  });

  handleSendToPending = action(() => {
    ConfirmationDialogService.show(
      'Send to review',
      'You are about to send the unit to pending, Do you want to continue ?',
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
            ReviewListService.handleMyUnits();
            ReviewListService.handleAllUnits();
            browserHistory.push('/reviews');
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
  });

  handleSendToReviewed = action(() => {
    this.form.setSubmitted();
    const comments = this.form.getValue('comments');
    if (this.form.errors || comments.length === 0 || comments === '<p><br></p>') {
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
  });

  handleSendToDone = action(() => {
    this.form.setSubmitted();
    const comments = this.form.getValue('comments');
    if (this.form.errors || comments.length === 0 || comments === '<p><br></p>') {
      return;
    }
    ConfirmationDialogService.show(
      'Unit Done',
      'This means you already fixed all comments, and cannot be reverted. Are you sure you want to confirm?',
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
  });
}

export default ContentReviewService;
