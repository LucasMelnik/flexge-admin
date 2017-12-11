import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class SemiannualEnglishLevelProgressService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      englishLevelProgress: [],
      average: computed(() => (
        this.englishLevelProgress.length ? (
          this.englishLevelProgress.reduce((acc, level) => acc + level.schoolAverageProgress, 0)
            / this.englishLevelProgress.length
        ) : 0
      )),
      projection: computed(() => (
        4 / (this.average / 6)
      )),
    });
  }

  validateResponse = () => this.englishLevelProgress.length > 0;

  load = action(() => {
    this.englishLevelProgress = [];
    this.fetch.fetch({
      url: '/reports/semiannual-english-level-progress',
    }).then(() => {
      if (this.fetch.data) {
        this.englishLevelProgress = this.fetch.data;
      }
    });
  });
}

const semiannualEnglishLevelProgressService = new SemiannualEnglishLevelProgressService();

export default semiannualEnglishLevelProgressService;
