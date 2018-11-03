import {action, extendObservable} from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';

export default class CompanyApiKeyFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      companyId: null,
    });
  }

  handleLoad = action((companyId) => {
    this.companyId = companyId;
    this.form.reset();
    this.fetch.fetch({
      url: `/companies/${companyId}/api-key`,
    }).then(() => {
      if (this.fetch.data) {
        this.form.setInitialValues(this.fetch.data);
      }
    });
  });

  handleSubmit = action(() => {
    this.submit.fetch({
      method: 'patch',
      url: `/companies/${this.companyId}/api-key`,
    }).then(() => {
      if (this.submit.data) {
        this.form.setInitialValues(this.submit.data);
        this.form.reset();

        NotificationService.addNotification('Key successfully created', 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification('Error to create the Key', 'error');
      }
    });
  });
}
