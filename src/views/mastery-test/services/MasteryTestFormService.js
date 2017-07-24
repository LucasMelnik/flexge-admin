import { action, extendObservable } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class MasteryTestFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      masteryTestId: null,
      items: [],
    });
    this.form.validations = {
      modulePercentageToActive: [isRequired],
      deadlineTime: [isRequired],
      scoreToPass: [isRequired],
    };
  }

  handleLoad = action((moduleId, masteryTestId) => {
    this.fetch.fetch({
      url: `/modules/${moduleId}/mastery-tests/${masteryTestId}`,
    }).then(() => {
      if (this.fetch.data) {
        this.form.setInitialValues(this.fetch.data);
      } else {
        this.form.setInitialValues({});
      }
    });
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const masteryTestId = this.form.getValue('id');
    const moduleId = this.form.getValue('module');
    this.submit.fetch({
      method: masteryTestId ? 'put' : 'post',
      url: masteryTestId ? `/modules/${moduleId}/mastery-tests/${masteryTestId}` : `/modules/${moduleId}/mastery-tests`,
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const masteryTest = this.submit.data;
        browserHistory.push(`/modules/${moduleId}/units`);
        this.masteryTestId = masteryTest.id;
        this.form.reset();
        this.form.setInitialValues(masteryTest);
        NotificationService.addNotification(
          `Mastery Test ${masteryTestId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${masteryTestId ? 'updating' : 'creating'} Mastery Test.`,
          null,
          null,
          'danger',
        );
      }
    });
  });

  handleLoadItems = action((masteryTestId) => {
    this.fetch.fetch({
      url: `/mastery-tests/${masteryTestId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.items = this.fetch.data;
      } else {
        this.items = [];
      }
    });
  });
}

const masteryTestFormService = new MasteryTestFormService();

export default masteryTestFormService;
