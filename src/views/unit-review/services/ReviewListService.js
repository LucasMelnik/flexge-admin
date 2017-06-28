import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class ReviewListService {
  fetch = new FetchService();
  formMyReviews = new FormService();
  formAllReviews = new FormService();

  constructor() {
    extendObservable(this, {
      myUnitsAndReviews: [],
      allUnitsAndReviews: [],
    });
  }

  handleMyUnits = action(() => {
    this.fetch.fetch({
      url: '/reviews',
      query: {
        course: this.formMyReviews.getValue('course.id'),
        status: this.formMyReviews.getValue('status'),
        createdBy: localStorage.id,
      },
    }).then(() => {
      if (this.fetch.data && this.fetch.data.units) {
        this.myUnitsAndReviews = this.fetch.data.units.map((unit) => {
          const review = this.fetch.data.reviews.find(item => item.unit === unit.id);
          return {
            unit,
            review: review || {
              status: 'NOT SENT TO REVIEW',
            },
          };
        });
      }
    });
  });

  handleAllUnits = action(() => {
    this.fetch.fetch({
      url: '/reviews',
      query: {
        query: {
          course: this.formAllReviews.getValue('course.id'),
          status: this.formAllReviews.getValue('status'),
        },
      },
    }).then(() => {
      if (this.fetch.data && this.fetch.data.units) {
        const units = this.fetch.data.units;
        const reviews = this.fetch.data.reviews;
        this.allUnitsAndReviews = units.filter((unit) => {
          const unitReview = reviews.find(review => review.unit === unit.id);
          if (!unitReview || unitReview.status === 'DONE') {
            return false;
          }
          return true;
        }).map((unit) => {
          const review = reviews.find(item => item.unit === unit.id);
          return {
            unit,
            review,
          };
        });
      }
    });
  });

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
  });
}

const reviewListService = new ReviewListService();

export default reviewListService;
