import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../../core/services/FetchService';

class CompanyDetailService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      company: null,
    });
  }

  handleLoad = action((companyId) => {
    if (companyId) {
      this.fetch.fetch({
        url: `/companies/${companyId}`,
      }).then(() => {
        this.company = this.fetch.data;
      });
    }
  });

}

const companyDetailService = new CompanyDetailService();

export default companyDetailService;
