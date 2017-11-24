import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class DistributorListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      allDistributors: [],
      filteredDistributors: [],
      filter: '',
    });
  }

  load = action(() => {
    this.fetch.fetch({
      url: '/distributors',
    }).then(() => {
      if (this.fetch.data) {
        this.allDistributors = this.fetch.data;
        this.filteredDistributors = this.fetch.data;
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.filteredDistributors = this.allDistributors
      .filter(distributor => distributor.name.toLowerCase().search(value) !== -1);
  });
}

const distributorListService = new DistributorListService();

export default distributorListService;
