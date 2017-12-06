import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class CourseFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      certificationTestId: null,
    });
    this.form.validations = {
      name: [isRequired],
      description: [isRequired],
    };
  }

  handleLoad = action((certificationTestId) => {
    this.form.reset();
    if (certificationTestId) {
      this.fetch.fetch({
        url: `/certification-test/${certificationTestId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.certificationTestId = certificationTestId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const certificationTestId = this.form.getValue('id');
    this.submit.fetch({
      method: certificationTestId ? 'put' : 'post',
      url: certificationTestId ? `/certification-test/${certificationTestId}` : '/certification-test',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const certificationTest = this.submit.data;
        this.certificationTestId = certificationTest.id;
        this.form.reset();
        this.form.setInitialValues(certificationTest);

        NotificationService.addNotification(`Course ${certificationTestId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${certificationTestId ? 'updating' : 'creating'} certificationTest.`, 'error');
      }
    });
  });
}
