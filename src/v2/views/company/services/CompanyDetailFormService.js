import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../../core/services/FetchService';
import FormService from '../../../../core/services/FormService';

class CompanyDetailFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      companyId: null,
    });
  }

  handleLoad = action((companyId) => {
    this.form.reset();
    if (companyId) {
      this.fetch.fetch({
        url: `/companies/${companyId}`,
      }).then(() => {
        if (this.fetch.data) {
          const initialValues = this.fetch.data;
          if (initialValues.contractStart) {
            initialValues.contractStart = new Date(initialValues.contractStart);
          }
          if (initialValues.contractEnd) {
            initialValues.contractEnd = new Date(initialValues.contractEnd);
          }
          this.form.setInitialValues(initialValues);
        }
      });
    } else {
      this.form.setInitialValues({ country: 'Brazil' });
    }
    this.companyId = companyId;
  });

}

const companyDetailFormService = new CompanyDetailFormService();

export default companyDetailFormService;
