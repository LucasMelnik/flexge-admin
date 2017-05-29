import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

export default class AllAthletesService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      companies: [],
      total: 0,
      limit: 0,
    });
  }

  load = action(() => {
    this.fetch.fetch({
      url: '/companies',
    }).then(() => {
      if (this.fetch.data) {
        this.companies = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
      } else {
        this.companies = [];
        this.total = 0;
        this.limit = 0;
      }
    });
  });
}
