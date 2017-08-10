import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../../core/services/FetchService';
import FormService from '../../../../core/services/FormService';
import NotificationService from '../../../../core/services/NotificationService';
import { isRequired, isCNPJ } from '../../../../core/validations';

class CompanyFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      companyId: null,
    });
    this.form.validations = {
      name: [isRequired],
      state: [isRequired],
      cnpj: [isRequired, isCNPJ],
    };
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

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const companyId = this.form.getValue('id');
    this.submit.fetch({
      method: companyId ? 'put' : 'post',
      url: companyId ? `/companies/${companyId}` : '/companies',
      body: {
        ...this.form.getValues(),
        state: this.form.getValue('state').value,
      },
    }).then(() => {
      if (this.submit.data) {
        const company = this.submit.data;
        browserHistory.push(`/v2/companies/${company.id}`);
        this.companyId = company.id;
        this.form.reset();
        if (company.contractStart) {
          company.contractStart = new Date(company.contractStart);
        }
        if (company.contractEnd) {
          company.contractEnd = new Date(company.contractEnd);
        }
        this.form.setInitialValues(company);

        window.showSuccess(`Company ${companyId ? 'updated' : 'created'} successfully.`);
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${companyId ? 'updating' : 'creating'} company.`,
          null,
          null,
          'danger',
        );
      }
    });
  });
}

const companyFormService = new CompanyFormService();

export default companyFormService;
