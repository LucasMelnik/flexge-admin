import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class FormatReviewService {
  submit = new FetchService();
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    this.form.validations = {
      'review.statusFormat': [isRequired],
    };
    extendObservable(this, {
      moduleId: null,
      masteryTestId: null,
    });
  }

  init = action((moduleId, masteryTestId) => {
    this.moduleId = moduleId;
    this.masteryTestId = masteryTestId;
    this.handleLoad();
  });

  handleLoad = action(() => {
    this.fetch.fetch({
      url: `/modules/${this.moduleId}/mastery-tests/${this.masteryTestId}`,
    }).then(() => {
      if (this.fetch.data) {
        this.form.setInitialValues(this.fetch.data);
      }
    });
  });

  handleSaveStatusFormat = action(() => {
    this.form.setSubmitted();
    if (this.form.errors) {
      return;
    }
    this.submit.fetch({
      method: 'put',
      url: `/modules/${this.moduleId}/mastery-tests/${this.masteryTestId}`,
      body: {
        ...this.form.getValues(),
      },
    }).then((res) => {
      if (res) {
        NotificationService.addNotification(
          'Review Status Format changed successfully.',
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error changing Review Status Format.',
          null,
          null,
          'error',
        );
      }
    });
  });
}

export default FormatReviewService;
