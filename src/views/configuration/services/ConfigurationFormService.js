import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class ConfigurationFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this);
    this.form.validations = {
      numberOfDayBeforeFirstReview: [isRequired],
      numberOfDayBeforeSecondReview: [isRequired],
      percentageToEnableNextModuleGroup: [isRequired],
      percentageToEnableNextUnitGroup: [isRequired],
      pointsToIncreaseAfterTestFailure: [isRequired],
      pointsToIncreaseAfterCertificationTestFailure: [isRequired],
      videoUrl: [isRequired],
      scoreToPassOfSpeechRecognition: [isRequired],
    };
  }

  handleLoad = action(() => {
    this.form.setInitialValues({});
    this.form.reset();

    this.fetch.fetch({
      url: '/configuration',
    }).then(() => {
      if (this.fetch.data) {
        this.form.setInitialValues(this.fetch.data);
      }
    });
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const configurationId = this.form.getValue('id');
    this.submit.fetch({
      method: configurationId ? 'put' : 'post',
      url: configurationId ? `/configuration/${configurationId}` : '/configuration',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        this.form.setInitialValues(this.submit.data);
        this.form.reset();
        NotificationService.addNotification(
          `Configuration ${configurationId ? 'updated' : 'created'} successfully.`,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${configurationId ? 'updating' : 'creating'} the configurations.`,
          'error',
        );
      }
    });
  })
}

const configurationFormService = new ConfigurationFormService();

export default configurationFormService;
