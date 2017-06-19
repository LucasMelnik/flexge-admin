import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class LoadModuleService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      module: {},
    });
  }

  handleLoad = action((moduleId) => {
    this.fetch.fetch({
      url: `/modules/${moduleId}`,
    }).then(action(() => {
      if (this.fetch.data) {
        this.module = this.fetch.data;
      }
    }));
  });
}

const loadModuleService = new LoadModuleService();

export default loadModuleService;
