import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';
import PlacementTestItemListService from './PlacementTestItemListService'

class PlacementTestReviewService {
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      status: [isRequired],
      comments: [isRequired],
    });
  }

  handleLoad = action((placementTestId, review) => {
    this.placementTestId = placementTestId;
    this.form.setInitialValues(review);
    this.form.reset();
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    const comments = this.form.getValue('comments');
    const status = this.form.getValue('status');
    if (this.form.errors || (status !== 'APPROVED' && (comments.length === 0 || comments === '<p><br></p>'))) {
      NotificationService.addNotification(
        'Please leave a comment to update the review',
        null,
        null,
        'error',
      );
      return;
    }
    this.submit.fetch({
      method: 'patch',
      url: `/grammar-placement-test-levels/${this.placementTestId}/item/${this.form.getValue('forItem')}/review`,
      body: {
        status: this.form.getValue('status'),
        comments: this.form.getValue('comments'),
      },
    }).then(() => {
      if (this.submit.data) {
        this.form.setInitialValues({
          ...this.submit.data.reviews.find(review => review.forItem === this.form.getValue('forItem')),
        });
        this.form.reset();
        PlacementTestItemListService.load();
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
