import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

class SchoolManagerFormService {
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
    };
  }

  init = action((schoolId, successCallback) => {
    this.schoolId = schoolId;
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
      url: managerId ? `/schools/${this.schoolId}/managers/${managerId}` : `/schools/${this.schoolId}/managers`,
      body: this.form.getValues(),
    }).then(() => {
      if (this.submit.data) {
        this.form.reset();
        this.form.setInitialValues({ school: this.schoolId });
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

const companyFormService = new SchoolManagerFormService();

export default companyFormService;
