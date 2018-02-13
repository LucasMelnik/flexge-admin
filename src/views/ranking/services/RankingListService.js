import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import NotificationService from '../../../core/services/NotificationService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';

class RankingListService {
  form = new FormService();
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      rankingsByLevel: {},
      from: null,
      to: null,
    });
    this.form.validations = {
      school: localStorage.role === 'ADMIN' ? [(value, all) => !value && !all.country && !all.region && 'Required'] : [isRequired],
      country: localStorage.role === 'ADMIN' ? [(value, all) => !value && !all.school && 'Required'] : [],
      region: localStorage.role === 'ADMIN' ? [(value, all) => !value && !all.school && 'Required'] : [],
    };

    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      const school = JSON.parse(localStorage.getItem('school'));
      this.form.setValue('school', school._id);
    }
  }

  registerLevel = action((level, from, to) => {
    this.from = from;
    this.to = to;
    this.rankingsByLevel = {
      ...this.rankingsByLevel,
      [level]: [],
    };
    this.load(level);
  });

  handleSearch = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification(
        'Please inform the required filters',
        'error',
      );
      return;
    }

    Object.keys(this.rankingsByLevel).map(level => this.load(level));
  });

  load = action((level) => {
    this.form.submitted = true;
    if (this.form.errors) {
      this.form.reset();
      return;
    }

    this.fetch.fetch({
      url: '/reports/ranking',
      query: {
        from: this.from,
        to: this.to,
        level,
        ...this.form.getValue('school') && {
          school: this.form.getValue('school'),
        },
        ...this.form.getValue('region') && {
          region: this.form.getValue('region'),
        },
        ...this.form.getValue('country') && {
          country: this.form.getValue('country'),
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.rankingsByLevel[level] = this.fetch.data;
      } else {
        this.rankingsByLevel[level] = [];
      }
    });
  });
}

const rankingListService = new RankingListService();

export default rankingListService;
