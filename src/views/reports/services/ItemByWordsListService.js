import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';
import NotificationService from '../../../core/services/NotificationService';

class ItemByWordsListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      items: [],
    });
    this.form.validations = {
      course: [isRequired],
      module: [isRequired],
      words: [isRequired],
    };
  }

  init = action(() => {
    this.items = [];
  });

  load = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    this.fetch.fetch({
      url: `/reports/courses/${this.form.getValue('course')}/modules/${this.form.getValue('module')}/items-by-words`,
      query: {
        words: this.form.getValue('words'),
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

const itemByWordsListService = new ItemByWordsListService();

export default itemByWordsListService;
