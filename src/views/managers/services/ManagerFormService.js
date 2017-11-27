import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

export default class ManagerFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      url: null,
      managerId: null,
      successCallback: null,
    });
    this.form.validations = {
      name: [isRequired],
      email: [isRequired, isValidEmail],
      password: [isRequired],
    };
  }

  init = action((url, successCallback) => {
    this.url = url;
    this.successCallback = successCallback;
  });

  setInitialValues = action((manager) => {
    this.form.reset();
    this.form.setInitialValues(manager);
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const managerId = this.form.getValue('id');
    this.submit.fetch({
      method: managerId ? 'put' : 'post',
      url: managerId ? `${this.url}/${managerId}` : this.url,
      body: this.form.getValues(),
    }).then(() => {
      if (this.submit.data) {
        this.form.reset();
        this.form.setInitialValues({});
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
          'error',
        );
      }
    });
  })
}
