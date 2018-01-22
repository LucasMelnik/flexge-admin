import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class ClassSemiannualAverageEnglishLevelProgressService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: null,
      projection: computed(() => (
        4 / (this.data / 6)
      )),
    });
  }

  load = action((schoolId, classId) => {
    this.data = null;
    this.fetch.fetch({
      url: `/reports/schools/${schoolId}/classes/${classId}/average-english-level-progress`,
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data.averageProgress;
      }
    });
  });
}

const classSemiannualAverageEnglishLevelProgressService = new ClassSemiannualAverageEnglishLevelProgressService();

export default classSemiannualAverageEnglishLevelProgressService;
