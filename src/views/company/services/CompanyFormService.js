import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isCNPJ } from '../../../core/validations';

export default class CompanyFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      companyId: null,
    });
    this.form.validations = {
      name: [isRequired],
      country: [isRequired],
      state: [isRequired],
      distributor: [isRequired],
      cnpj: [isRequired],
    };
  }

  handleLoad = action((companyId, distributorId) => {
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
      this.form.setInitialValues({
        ...distributorId && {
          distributor: distributorId,
        },
        ...localStorage.role === 'DISTRIBUTOR_MANAGER' && {
          distributor: localStorage.distributor,
        },
      });
    }
    this.companyId = companyId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.getValue('country') === '5a01ff39898e1571b5d5172b') {
      this.form.validations.cnpj.push(isCNPJ);
    } else {
      this.form.validations.cnpj = [isRequired];
    }
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const companyId = this.form.getValue('id');
    this.submit.fetch({
      method: companyId ? 'put' : 'post',
      url: companyId ? `/companies/${companyId}` : '/companies',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const company = this.submit.data;
        this.companyId = company.id;
        if (company.contractStart) {
          company.contractStart = new Date(company.contractStart);
        }
        if (company.contractEnd) {
          company.contractEnd = new Date(company.contractEnd);
        }
        this.form.setInitialValues(company);
        this.form.reset();

        NotificationService.addNotification(`Company ${companyId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${companyId ? 'updating' : 'creating'} company.`, 'error');
      }
    });
  });
}
