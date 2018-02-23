import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';
import NotificationService from '../../../core/services/NotificationService';

class UsageStatsListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      schools: [],
    });
    this.form.validations = {
      month: [isRequired],
    };
  }

  init = action(() => {
    this.schools = [];
    if (localStorage.role === 'SCHOOL_MANAGER') {
      const school = JSON.parse(localStorage.getItem('school'));
      this.form.setValue('school', school._id);
    }
  });

  load = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    this.fetch.fetch({
      url: `/reports/${this.form.getValue('month').format('MM-YYYY')}/usage-stats`,
      query: {
        ...this.form.getValue('school') && {
          school: this.form.getValue('school'),
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.schools = this.fetch.data;
      } else {
        this.schools = [];
      }
    });
  });
}

const usageStatsListService = new UsageStatsListService();

export default usageStatsListService;
