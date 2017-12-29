import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class SemiannualAverageEnglishLevelService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
      average: computed(() => (
        this.data.length ? (
          this.data.reduce((acc, level) => acc + level.averageEnglishLevel, 0)
            / this.data.length
        ) : 0
      )),
    });
  }

  validateResponse = () => this.data.length > 0;

  load = action(() => {
    this.data = [];
    this.fetch.fetch({
      url: '/reports/semiannual-average-english-level',
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const semiannualAverageEnglishLevelService = new SemiannualAverageEnglishLevelService();

export default semiannualAverageEnglishLevelService;
