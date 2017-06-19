import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class UnitReviewListService {
  fetch = new FetchService();
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      myUnits: [],
      unitsToReview: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
    });
  }

  handleMyUnitsToReview = action(() => {
    const moduleId = '59409462612d0d14d9d4f7b1';
    this.fetch.fetch({
      url: `/modules/${moduleId}/units`,
      query: {
        page: this.page,
        size: this.rowsByPage,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.myUnits = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.myUnits = [];
        this.total = 0;
      }
    });
  });

  onSendReview = action((unit) => {
    ConfirmationDialogService.show(
      'Send to review',
      `You are about to send the unit "${unit.name}" to review, Do you want to continue ?`,
      () => {
        this.submit.fetch({
          method: 'post',
          url: '/reviews',
          body: {
            status: 'PENDING',
            user: unit.createdBy,
            unit: unit.id,
          },
        }).then((res) => {
          if (res) {
            NotificationService.addNotification(
              'Review created successfully.',
              null,
              null,
              'success',
            );
          }
          if (this.submit.error) {
            NotificationService.addNotification(
              'Error creating review.',
              null,
              null,
              'danger',
            );
          }
        });
      });
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/reviews',
      query: {
        page: this.page,
        size: this.rowsByPage,
      },
    }).then(() => {
      if (this.fetch.data) {
        const user = localStorage.getItem('id');
        this.myUnits = this.fetch.data.docs.filter(review => review.createdBy === user);
        this.unitsToReview = this.fetch.data.docs.filter(review => review.reviewedBy === user);
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.units = [];
        this.total = 0;
        this.pageCount = 1;
      }
    });
  });

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
  });
}

const unitReviewListService = new UnitReviewListService();

export default unitReviewListService;
