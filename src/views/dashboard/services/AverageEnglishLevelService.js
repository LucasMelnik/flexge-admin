import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class AverageEnglishLevelService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      englishLevelProgress: [],
      average: computed(() => (
        this.englishLevelProgress.length ? (
          this.englishLevelProgress.reduce((acc, level) => acc + level.averageEnglishLevel, 0)
            / this.englishLevelProgress.length
        ) : 0
      )),
    });
  }

  validateResponse = () => this.englishLevelProgress.length > 0;

  load = action(() => {
    this.englishLevelProgress = [];
    this.fetch.fetch({
      url: '/reports/semiannual-average-english-level',
    }).then(() => {
      if (this.fetch.data) {
        this.englishLevelProgress = this.fetch.data;
      }
    });
  });
}

const averageEnglishLevelService = new AverageEnglishLevelService();

export default averageEnglishLevelService;
