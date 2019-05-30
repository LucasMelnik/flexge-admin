import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, betweenValues } from '../../../core/validations';

class CertificationTestScheduleReviewItemService {
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      isOpen: false,
      successCallback: () => false,
    });
    this.form.validations = {
      reviewerScore: [isRequired, betweenValues(0, 100)],
    };
  }

  init = action((item, successCallback) => {
    this.successCallback = successCallback;
    this.form.setInitialValues(item);
  });

  handleOpen = action(() => {
    this.isOpen = true;
    this.form.reset();
  });

  handleClose = action(() => {
    this.isOpen = false;
    this.form.setInitialValues({});
    this.form.reset();
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    this.submit.fetch({
      method: 'put',
      url: `/certification-test/${this.form.getValue('certificationTest')}/items/${this.form.getValue('id')}/review`,
      body: {
        reviewerScore: this.form.getValue('reviewerScore'),
        reviewerComment: this.form.getValue('reviewerComment'),
      },
    }).then(() => {
      if (this.submit.data) {
        this.isOpen = false;
        this.successCallback();
        NotificationService.addNotification('Item successfully reviewed.', 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification('Error to review item', 'error');
      }
    });
  });
}

const certificationTestScheduleReviewItemService = new CertificationTestScheduleReviewItemService();

export default certificationTestScheduleReviewItemService;
