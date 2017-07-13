import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class LoadUnitService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      unit: {},
    });
  }

  handleLoad = action((moduleId, unitId) => {
    this.unit = {};
    this.fetch.fetch({
      url: `/modules/${moduleId}/units/${unitId}`,
    }).then(action(() => {
      if (this.fetch.data) {
        this.unit = this.fetch.data;
      }
    }));
  });
}

export default LoadUnitService;
