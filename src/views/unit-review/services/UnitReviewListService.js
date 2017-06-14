import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class UnitReviewListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      units: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
      toReview: false,
    });
  }

  isReview = action((toReview) => {
    this.toReview = toReview;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/reviews',
      query: {
        page: this.page,
        size: this.rowsByPage,
        createdBy: !this.toReview,
        reviewedBy: this.toReview,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.units = this.fetch.data.docs;
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

// const unitReviewListService = new UnitReviewListService();

export default UnitReviewListService;
