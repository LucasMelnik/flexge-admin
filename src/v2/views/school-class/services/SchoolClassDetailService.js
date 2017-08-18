import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';

class SchoolClassDetailService {
  fetchSchool = new FetchService();
  fetchDistributor = new FetchService();
  fetchCompany = new FetchService();
  fetchClass = new FetchService();

  constructor() {
    extendObservable(this, {
      school: null,
      company: null,
      distributor: null,
      class: null,
    });
  }

  handleLoadSchool = action((schoolId) => {
    this.fetchSchool.fetch({
      url: `/schools/${schoolId}`,
    }).then(() => {
      this.school = this.fetchSchool.data;
    });
  });

  handleLoadCompany = action((companyId) => {
    this.fetchCompany.fetch({
      url: `/companies/${companyId}`,
    }).then(() => {
      this.company = this.fetchCompany.data;
    });
  });

  handleLoadDistributor = action((distributorId) => {
    this.fetchDistributor.fetch({
      url: `/distributors/${distributorId}`,
    }).then(() => {
      this.distributor = this.fetchDistributor.data;
    });
  });

  handleLoadClass = action((schoolId, classId) => {
    this.fetchClass.fetch({
      url: `/schools/${schoolId}/classes/${classId}`,
    }).then(() => {
      this.class = this.fetchClass.data;
    });
  });

}

const schoolClassDetailService = new SchoolClassDetailService();

export default schoolClassDetailService;
