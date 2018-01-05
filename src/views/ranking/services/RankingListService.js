import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

export default class RankingListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      rankings: [],
    });
  }

  load = action((school, from, to, level) => {
    this.fetch.fetch({
      url: `/reports/schools/${school}/ranking?from=${from}&to=${to}&level=${level}`,
    }).then(() => {
      if (this.fetch.data) {
        this.rankings = this.fetch.data;
      } else {
        this.rankings = [];
      }
    });
  });
}
