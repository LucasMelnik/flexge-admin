import { extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class ReviewStatusFormatContainer {
  submit = new FetchService();
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    this.form.validations = {
      statusFormat: [isRequired],
    };
    extendObservable(this, {
      statusFormat: null,
    });
  }

  handleSaveStatusFormat = (unitId, reviewId) => {
    this.form.setSubmitted();
    if (this.form.errors) {
      return;
    }
    this.submit.fetch({
      method: 'put',
      url: `/reviews/${reviewId}`,
      body: {
        statusFormat: this.form.getValue('statusFormat'),
        unit: unitId,
      },
    }).then((res) => {
      if (res) {
        NotificationService.addNotification(
          'Review Status Format changed successfully.',
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error changing Review Status Format.',
          null,
          null,
          'danger',
        );
      }
    });
  };
}

export default ReviewStatusFormatContainer;
