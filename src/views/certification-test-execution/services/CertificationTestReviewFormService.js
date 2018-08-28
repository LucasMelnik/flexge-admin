import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class CertificationTestReviewFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      certificationTestId: null,
    });
    this.form.validations = {
      readingScore: [isRequired],
      listeningScore: [isRequired],
      speakingScore: [isRequired],
      writingScore: [isRequired],
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
      url: `/certification-test/${certificationTestId}/review`,
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        NotificationService.addNotification('Certification Test successfully Reviewed.', 'success');
        browserHistory.goBack();
      }
      if (this.submit.error) {
        NotificationService.addNotification('Error to Store the Review of Certification Test.', 'error');
      }
    });
  });
}

const certificationTestReviewFormService = new CertificationTestReviewFormService();

export default certificationTestReviewFormService;
