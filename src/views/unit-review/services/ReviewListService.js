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
    this.formMyReviews.validations = {
      course: [
        (course, values) => {
          console.log('values', values)
          const isEmpty = !Object.keys(values).length ||
            Object.keys(values).reduce((acc, key) => {
              if (!acc) return acc;
              return !values[key];
            }, true);
          if (isEmpty) return 'Inform at least one field';
          return null;
        },
      ],
    };
    this.formAllReviews.validations = {
      course: [
        (course, values) => {
          console.log('values', values)
          const isEmpty = !Object.keys(values).length ||
            Object.keys(values).reduce((acc, key) => {
              if (!acc) return acc;
              return !values[key];
            }, true);
          if (isEmpty) return 'Inform at least one field';
          return null;
        },
      ],
    };
  }

  handleMyUnits = action(() => {
    this.formMyReviews.setSubmitted();
    if (this.formMyReviews.errors) {
      return;
    }
    this.fetch.fetch({
      url: '/reviews',
      query: {
        course: this.formMyReviews.getValue('course'),
        status: this.formMyReviews.getValue('status'),
        statusImage: this.formMyReviews.getValue('statusImage'),
        statusFormat: this.formMyReviews.getValue('statusFormat'),
        ...(localStorage.role !== 'ADMIN' && localStorage.role !== 'IMAGE_ADMIN') && {
          createdBy: localStorage.id,
        },
        ...(localStorage.role === 'ADMIN' && this.formMyReviews.getValue('createdBy')) && {
          unitCreatedBy: this.formMyReviews.getValue('createdBy'),
        },
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
    this.formAllReviews.setSubmitted();
    if (this.formAllReviews.errors) {
      return;
    }
    this.fetch.fetch({
      url: '/reviews',
      query: {
        course: this.formAllReviews.getValue('course'),
        status: this.formAllReviews.getValue('status'),
        statusFormat: this.formAllReviews.getValue('statusFormat'),
        ...(localStorage.role === 'ADMIN' && this.formAllReviews.getValue('createdBy')) && {
          unitCreatedBy: this.formAllReviews.getValue('createdBy'),
        },
      },
    }).then(() => {
      if (this.fetch.data && this.fetch.data.units) {
        const units = this.fetch.data.units;
        const reviews = this.fetch.data.reviews;
        this.allUnitsAndReviews = units.filter((unit) => {
          const unitReview = reviews.find(review => review.unit === unit.id);
          if (!unitReview || unitReview.status === 'DONE' || unitReview.status === 'REVIEWED') {
            return false;
          }
          if (unitReview.createdBy.id === localStorage.id) {
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

}

const reviewListService = new ReviewListService();

export default reviewListService;
