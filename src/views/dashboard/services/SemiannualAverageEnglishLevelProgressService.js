import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class SemiannualAverageEnglishLevelProgressService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: null,
      projection: computed(() => (
        4 / (this.data / 6)
      )),
    });
  }

  load = action(() => {
    this.data = null;
    this.fetch.fetch({
      url: '/reports/average-english-level-progress',
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data.averageProgress;
      }
    });
  });
}

const semiannualAverageEnglishLevelProgressService = new SemiannualAverageEnglishLevelProgressService();

export default semiannualAverageEnglishLevelProgressService;
