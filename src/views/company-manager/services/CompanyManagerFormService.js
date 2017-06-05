import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

class CompanyManagerFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      managerId: null,
      successCallback: null,
    });
    this.form.validations = {
      name: [isRequired],
      email: [isRequired, isValidEmail],
      company: [isRequired],
    };
  }

  setInitialValues = action((manager, successCallback) => {
    this.form.reset();
    this.form.setInitialValues(manager);
    this.companyId = manager.company;
    this.successCallback = successCallback;
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
        this.form.reset();
        this.form.setInitialValues({ company: this.companyId });
        NotificationService.addNotification(
          `Manager ${managerId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );

        if (this.successCallback) {
          this.successCallback();
        }
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

const companyFormService = new CompanyManagerFormService();

export default companyFormService;
