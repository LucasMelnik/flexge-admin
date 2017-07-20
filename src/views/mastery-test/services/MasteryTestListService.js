import { action, extendObservable } from 'mobx';
import { orderBy } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class MasteryTestListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      masteryTests: [],
    });
  }

  handleLoad = action((moduleId) => {
    this.fetch.fetch({
      url: `/modules/${moduleId}/mastery-tests`,
    }).then(() => {
      if (this.fetch.data) {
        this.masteryTests = this.fetch.data.map((masteryTest, index) => ({
          ...masteryTest,
          index: index + 1,
        }));
      } else {
        this.masteryTests = [];
      }
    });
  });
}

const masteryTestListService = new MasteryTestListService();

export default masteryTestListService;
