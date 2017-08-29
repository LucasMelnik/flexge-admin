import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';

class PlacementTestReviewService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {});
  }

  handleLoad = action((placementTestId) => {
    this.form.reset();
    this.fetch.fetch({
      url: `/grammar-placement-test-levels/${placementTestId}`,
    }).then(() => {
      if (this.fetch.data) {
        this.form.setInitialValues(this.fetch.data);
      }
    });
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const placementTestId = this.form.getValue('id');
    this.submit.fetch({
      method: 'patch',
      url: `/grammar-placement-test-levels/${placementTestId}/review`,
      body: {
        status: this.form.getValue('review.status'),
        comments: this.form.getValue('review.comments'),
      },
    }).then(() => {
      if (this.submit.data) {
        this.form.reset();
        this.form.setInitialValues(this.submit.data);
        NotificationService.addNotification(
          'Review updated successfully.',
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to updated Review.',
          null,
          null,
          'error',
        );
      }
    });
  })
}

const placementTestReviewService = new PlacementTestReviewService();

export default placementTestReviewService;
