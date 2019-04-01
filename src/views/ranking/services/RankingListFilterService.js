import { action, extendObservable } from 'mobx';
import moment from 'moment';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class RankingListFilterService {
  form = new FormService();

  constructor() {
    extendObservable(this, {
      services: {},
    });
    this.form.validations = {
      academicPlan: [isRequired],
      school: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER'].some(role => role === localStorage.role) ? [(value, all) => !value && !all.country && !all.region && 'Required'] : [isRequired],
      country: ['ADMIN', 'DISTRIBUTOR_MANAGER'].some(role => role === localStorage.role) ? [(value, all) => !value && !all.school && 'Required'] : [],
      region: ['ADMIN', 'DISTRIBUTOR_MANAGER'].some(role => role === localStorage.role) ? [(value, all) => !value && !all.school && 'Required'] : [],
    };
    this.form.setValue('month', moment().format('MM'));
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      this.form.setValue('school', localStorage.getItem('school'));
    }
  }

  init = action(() => {
    this.services = {};
    this.form.setInitialValues({});
    this.form.setValue('month', moment().format('MM'));
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      this.form.setValue('school', localStorage.getItem('school'));
    }
  });

  registerService = action((type, service) => {
    if (!this.services[type]) {
      this.services[type] = [];
    }
    this.services[type].push(service);

    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      service.load();
    }
  });

  handleSearch = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Check the required fields', 'error');
      return;
    }
    Object.keys(this.services).forEach((key) => {
      this.services[key].forEach(service => service.load(key === 'month'));
    });
  });

  handleSearchMonthlyRanking = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Check the required fields', 'error');
      return;
    }

    if (this.services.month) {
      this.services.month.forEach(service => service.load(true));
    }
  });
}

const rankingListFilterService = new RankingListFilterService();

export default rankingListFilterService;
