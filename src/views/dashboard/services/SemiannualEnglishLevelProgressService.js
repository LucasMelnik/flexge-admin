import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class SemiannualEnglishLevelProgressService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: [],
      average: computed(() => (
        this.data.length ? (
          this.data.reduce((acc, level) => acc + level.schoolAverageProgress, 0)
            / this.data.length
        ) : 0
      )),
      projection: computed(() => (
        4 / (this.average / 6)
      )),
      byClass: computed(() => {
        if (!this.data.length) {
          return [];
        }
        return this.data.reduce((acc, school) => ([
          ...school.classes,
          ...acc,
        ]), []);
      }),
    });
  }

  validateResponse = () => this.data.length > 0;

  load = action((query) => {
    this.data = [];
    this.fetch.fetch({
      url: '/reports/semiannual-english-level-progress',
      query
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const semiannualEnglishLevelProgressService = new SemiannualEnglishLevelProgressService();

export default semiannualEnglishLevelProgressService;
