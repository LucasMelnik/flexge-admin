import { action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class MasteryTestFormService {
  submit = new FetchService();
  form = new FormService();

  constructor() {
    this.form.validations = {
      modulePercentageToActive: [isRequired],
    };
  }

  handleLoad = action((moduleId, masteryTestId) => {
    this.form.reset();
    if (!masteryTestId) {
      this.form.setInitialValues({ module: moduleId });
      return;
    }
    this.submit.fetch({
      url: `/modules/${moduleId}/mastery-tests/${masteryTestId}`,
    }).then(() => {
      if (this.submit.data) {
        this.form.setInitialValues(this.submit.data);
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
        scoreToPass: 85,
        deadlineTime: 0,
      },
    }).then(() => {
      if (this.submit.data) {
        const masteryTest = this.submit.data;
        this.form.reset();
        this.form.setInitialValues(masteryTest);
        browserHistory.push(`/v2/modules/${moduleId}/mastery-tests/${masteryTest.id}`);
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
}

const masteryTestFormService = new MasteryTestFormService();

export default masteryTestFormService;
