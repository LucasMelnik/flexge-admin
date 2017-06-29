import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class CompanyManagerListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      companyId: null,
      managers: [],
    });
  }

  load = action((companyId) => {
    this.companyId = companyId;
    this.fetch.fetch({
      url: `/companies/${companyId}/managers`,
    }).then(() => {
      if (this.fetch.data) {
        this.managers = this.fetch.data;
      } else {
        this.managers = [];
        this.total = 0;
      }
    });
  });
}

const companyListService = new CompanyManagerListService();

export default companyListService;
