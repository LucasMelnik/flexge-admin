import { browserHistory } from 'react-router';
import { action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import NotificationService from '../../../core/services/NotificationService';
import ReviewListService from './ReviewListService';

class FinalReviewService {
  submit = new FetchService();

  handleSaveFinalReview = action((reviewId, unitId, finalStatus) => {
    this.submit.fetch({
      method: 'put',
      url: `/reviews/${reviewId}`,
      body: {
        finalStatus,
        unit: unitId,
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
}

export default FinalReviewService;
