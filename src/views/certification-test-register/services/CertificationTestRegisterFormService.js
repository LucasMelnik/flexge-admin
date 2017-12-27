import { action, extendObservable } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class CertificationTestRegisterFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      certificationTestId: null,
    });
    this.form.validations = {
      course: [isRequired],
      order: [isRequired],
      ability: [isRequired],
    };
  }

  handleLoad = action((certificationTestId) => {
    this.form.reset();
    if (certificationTestId) {
      this.fetch.fetch({
        url: `/certification-test-course-ability/${certificationTestId}`,
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
      url: certificationTestId ? `/certification-test-course-ability/${certificationTestId}` : '/certification-test-course-ability',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const certificationTest = this.submit.data;
        browserHistory.push(`/certification-test-register/${certificationTest.id}`);
        this.certificationTestId = certificationTest.id;
        this.form.reset();
        this.form.setInitialValues(certificationTest);
        NotificationService.addNotification(
          `Certification Test ${certificationTestId ? 'updated' : 'created'} successfully.`,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${certificationTestId ? 'updating' : 'creating'} Certification Test.`,
          'error',
        );
      }
    });
  })
}
