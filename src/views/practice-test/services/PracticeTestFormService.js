import { action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class PracticeTestFormService {
  submit = new FetchService();
  form = new FormService();

  constructor() {
    this.form.validations = {
      name: [isRequired],
    };
  }

  handleLoad = action((moduleId, practiceTestId) => {
    this.form.reset();
    if (!practiceTestId) {
      this.form.setInitialValues({});
      return;
    }
    this.submit.fetch({
      url: `/practice-tests/${practiceTestId}`,
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
    const practiceTestId = this.form.getValue('id');
    this.submit.fetch({
      method: practiceTestId ? 'put' : 'post',
      url: practiceTestId ? `/practice-tests/${practiceTestId}` : '/practice-tests',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const practiceTest = this.submit.data;
        this.form.reset();
        this.form.setInitialValues(practiceTest);
        browserHistory.push(`/practice-tests/${practiceTest.id}`);
        NotificationService.addNotification(
          `Practice Test ${practiceTestId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${practiceTestId ? 'updating' : 'creating'} Practice Test.`,
          null,
          null,
          'error',
        );
      }
    });
  });
}

const practiceTestFormService = new PracticeTestFormService();

export default practiceTestFormService;
