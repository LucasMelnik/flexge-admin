import { action, extendObservable, toJS } from 'mobx';
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
      unitsAndReviews: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
    });
  }

  load = action(() => {
    const fetchUnits = this.fetch.fetch({
      url: '/units',
      query: {
        page: 1,
        size: 2000,
      },
    });
    const fetchReviews = this.fetch.fetch({
      url: '/reviews',
      query: {
        page: 1,
        size: 2000,
      },
    });
    Promise.all([fetchUnits, fetchReviews]).then((values) => {
      this.unitsAndReviews = values[0].docs.map((unit) => {
        const review = values[1].docs.find(doc => doc.unit.id === unit.id);
        return {
          unit,
          review: review || {
            status: 'Not sent to review'
          },
        }
      })
      console.log(toJS(this.unitsAndReviews))
    });
  });

  loadMyUnitsToReview = action(() => {
    this.fetch.fetch({
      url: '/units',
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
            unit: unit.id,
          },
        }).then((res) => {
          if (res) {
            this.load();
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

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
  });
}

const unitReviewListService = new UnitReviewListService();

export default unitReviewListService;
