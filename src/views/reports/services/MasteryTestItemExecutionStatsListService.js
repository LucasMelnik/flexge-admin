import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';
import NotificationService from '../../../core/services/NotificationService';

class MasteryTestItemExecutionStatsListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      items: [],
    });
    this.form.validations = {
      course: [isRequired],
    };
  };


  init = action(() => {
    this.items = [];
    this.form.setInitialValues({});
    this.form.reset();
  });

  load = action(() => {
    this.form.setSubmitted();
    if (this.form.errors) {
      NotificationService.addNotification(
        'Please select the course',
        'error',
      );
      return;
    }
    this.fetch.fetch({
      url: `/reports/courses/${this.form.getValue('course')}/mastery-test-execution-stats`,
      query: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.fetch.data) {
        this.items = this.fetch.data;
      } else {
        this.items = [];
      }
    });
  });

}

const masteryTestItemExecutionStatsListService = new MasteryTestItemExecutionStatsListService();

export default masteryTestItemExecutionStatsListService;
