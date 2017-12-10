import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class EnglishLevelService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      englishLevelProgress: {},
    });
  }

  validateResponse = () => this.englishLevelProgress.length > 0;

  load = action(() => {
    this.fetch.fetch({
      url: '/reports/english-level-progress',
    }).then(() => {
      if (this.fetch.data) {
        this.EnglishLevelService = this.fetch.data;
      }
    });
  });
}

const englishLevelService = new EnglishLevelService();

export default englishLevelService;
