import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class FormatReviewService {
  submit = new FetchService();
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    this.form.validations = {
      statusFormat: [isRequired],
    };
    extendObservable(this, {
      statusFormat: null,
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

  handleSaveStatusFormat = action(() => {
    this.form.setSubmitted();
    if (this.form.errors) {
      return;
    }
    this.submit.fetch({
      method: 'put',
      url: `/reviews/${this.reviewId}`,
      body: {
        statusFormat: this.form.getValue('statusFormat'),
        ...this.form.getValue('commentsStatusFormat') && {
          commentsStatusFormat: this.form.getValue('commentsStatusFormat'),
        },
        unit: this.unitId,
      },
    }).then((res) => {
      if (res) {
        NotificationService.addNotification(
          'Review Status Format changed successfully.',
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error changing Review Status Format.',
          'error',
        );
      }
    });
  });
}

export default FormatReviewService;
