import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class ImageReviewService {
  submit = new FetchService();
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    this.form.validations = {
      statusImage: [isRequired],
    };
    extendObservable(this, {
      statusImage: null,
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

  handleSaveStatusImage = action(() => {
    this.form.setSubmitted();
    if (this.form.errors) {
      return;
    }
    this.submit.fetch({
      method: 'put',
      url: `/reviews/${this.reviewId}`,
      body: {
        statusImage: this.form.getValue('statusImage'),
        ...this.form.getValue('commentsImage') && {
          commentsImage: this.form.getValue('commentsImage'),
        },
        unit: this.unitId,
      },
    }).then((res) => {
      if (res) {
        NotificationService.addNotification(
          'Review Status Image changed successfully.',
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error changing Review Status Image.',
          'error',
        );
      }
    });
  });
}

export default ImageReviewService;
