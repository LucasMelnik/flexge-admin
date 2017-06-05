import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';
import CompanyManagerListService from './CompanyManagerListService';

class CompanyManagerFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      managerId: null,
    });
    this.form.validations = {
      name: [isRequired],
      email: [isRequired, isValidEmail],
      distributor: [isRequired],
    };
  }

  setInitialValues = action((companyId) => {
    this.form.reset();
    this.form.setInitialValues({ distributor: companyId });
    this.companyId = companyId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const managerId = this.form.getValue('id');
    this.submit.fetch({
      method: managerId ? 'put' : 'post',
      url: managerId ? `/companies/${this.companyId}/managers/${managerId}` : `/companies/${this.companyId}/managers`,
      body: this.form.getValues(),
    }).then(() => {
      if (this.submit.data) {
        CompanyManagerListService.load(this.companyId);
        this.form.reset();
        this.form.setInitialValues({ distributor: this.companyId });
        NotificationService.addNotification(
          `Manager ${managerId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${managerId ? 'updating' : 'creating'} manager.`,
          null,
          null,
          'danger',
        );
      }
    });
  })
}

const distributorFormService = new CompanyManagerFormService();

export default distributorFormService;
