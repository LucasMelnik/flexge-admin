import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class DistributorFormService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      distributor: {},
    });
  }

  handleLoad = action((distributorId) => {
    this.fetch.fetch({
      url: `/distributors/${distributorId}`,
    }).then(() => {
      this.distributor = this.fetch.data;
    });
  });

}

const distributorFormService = new DistributorFormService();

export default distributorFormService;
