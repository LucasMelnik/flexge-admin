import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { Roles } from '../../../core/util';

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

  handleMyUnits = action((backgroundLoad) => {
    this.formMyReviews.setSubmitted();
    if (this.formMyReviews.errors) {
      if (!backgroundLoad) {
        NotificationService.addNotification(
          'Please inform at least one filter',
          'error',
        );
      }
      return;
    }
    this.fetch.fetch({
      url: '/reviews',
      query: {
        course: this.formMyReviews.getValue('course'),
        module: this.formMyReviews.getValue('module'),
        status: this.formMyReviews.getValue('status'),
        statusImage: this.formMyReviews.getValue('statusImage'),
        statusFormat: this.formMyReviews.getValue('statusFormat'),
        ...(![Roles.ADMIN, Roles.SUPPORT, Roles.IMAGE_ADMIN].some(r => r === localStorage.role)) && {
          createdBy: localStorage.id,
        },
        ...([Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role) && this.formMyReviews.getValue('createdBy')) && {
          unitCreatedBy: this.formMyReviews.getValue('createdBy'),
        },
        ...([Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role) && this.formMyReviews.getValue('reviewedBy')) && {
          reviewedBy: this.formMyReviews.getValue('reviewedBy'),
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.myUnitsAndReviews = this.fetch.data.map(unit => {
          return {
            ...unit,
            review: unit.review && unit.review.id ? unit.review : {
              status: 'NOT SENT TO REVIEW',
            }
          }
        });
      }
    });
  });

  handleAllUnits = action((backgroundLoad) => {
    this.formAllReviews.setSubmitted();
    if (this.formAllReviews.errors) {
      if (!backgroundLoad) {
        NotificationService.addNotification(
          'Please inform at least one filter',
          'error',
        );
      }
      return;
    }
    this.fetch.fetch({
      url: '/reviews',
      query: {
        course: this.formAllReviews.getValue('course'),
        module: this.formMyReviews.getValue('module'),
        status: this.formAllReviews.getValue('status'),
        statusFormat: this.formAllReviews.getValue('statusFormat'),
        ...([Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role) && this.formAllReviews.getValue('createdBy')) && {
          unitCreatedBy: this.formAllReviews.getValue('createdBy'),
        },
        ...([Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role) && this.formMyReviews.getValue('reviewedBy')) && {
          reviewedBy: this.formMyReviews.getValue('reviewedBy'),
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.allUnitsAndReviews = this.fetch.data.filter(unit => {
          return !(!unit.review ||
            !unit.review.id ||
            unit.review.status === 'DONE' ||
            unit.review.status === 'REVIEWED' ||
            unit.review.createdBy.id === localStorage.id);
        });
      }
    });
  });

}

const reviewListService = new ReviewListService();

export default reviewListService;
