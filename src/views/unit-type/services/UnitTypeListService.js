import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class UnitTypeListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      types: [],
    });
  }

  init = action(() => {
    this.types = [];
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/unit-types',
    }).then(() => {
      if (this.fetch.data) {
        this.types = this.fetch.data;
      } else {
        this.types = [];
      }
    });
  });
}

const unitTypeListService = new UnitTypeListService();

export default unitTypeListService;
