import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class EmailConfigFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
    });
    this.form.validations = {
      emailFrequency: [isRequired],
    };
  }

  init = action((schoolId) => {
    this.schoolId = schoolId;
    this.handleLoad();
  });

  handleLoad = action(() => {
    this.form.reset();
    this.fetch.fetch({
      url: `/schools/${this.schoolId}`,
    }).then(() => {
      if (this.fetch.data) {
        const data = {
          ...this.fetch.data,
        };
        this.form.setInitialValues(data);
      }
    });
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const schoolId = this.form.getValue('id');
    this.submit.fetch({
      method: 'patch',
      url: `/schools/${schoolId}/email-config`,
      body: {
        emailFrequency: this.form.getValue('emailFrequency'),
      },
    }).then(() => {
      if (this.submit.data) {
        const school = this.submit.data;
        this.schoolId = school.id;
        this.form.setInitialValues({
          ...school,
        });
        NotificationService.addNotification('Successfully set the email frequency.', 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification('Error to set the email frequency', 'error');
      }
    });
  })
}
