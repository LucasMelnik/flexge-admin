import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class UnitReviewListService {
  fetch = new FetchService();

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
