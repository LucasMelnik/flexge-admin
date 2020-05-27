import FormService from '../../../core/services/FormService';
import { extendObservable } from 'mobx';
import { isRequired } from '../../../core/validations';

class DistributorManagerDashboardFilterService {
  form = new FormService();

  constructor() {
    extendObservable(this, {});
    this.form.validations = {
      distributor: [isRequired],
      company: [isRequired],
    };

    this.form.setInitialValues({});
    if (localStorage.role === 'DISTRIBUTOR_MANAGER') {
      this.form.setValue('distributor', localStorage.distributor);
    }
  }
}

const distributorManagerDashboardFilterService = new DistributorManagerDashboardFilterService();

export default distributorManagerDashboardFilterService;