import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class CertificationTestExecutionFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      certificationTestId: null,
      currentStudentName: '',
    });
    this.form.validations = {
      document: [isRequired],
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
      method: 'put',
      url: `/certification-test/${certificationTestId}/enable`,
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        NotificationService.addNotification('Certification Test successfully Enabled.', 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error to Enable Certification Test.`, 'error');
      }
    });
  });
}
