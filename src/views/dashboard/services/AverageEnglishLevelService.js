import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class AverageEnglishLevelService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: null,
    });
  }

  load = action(() => {
    this.data = null;
    this.fetch.fetch({
      url: '/reports/average-english-level',
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data.averageEnglishLevel;
      }
    });
  });
}

export default AverageEnglishLevelService;
