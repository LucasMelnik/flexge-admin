import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';
import NotificationService from '../../../core/services/NotificationService';

class StudentAchievementsListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      achievements: [],
    });
    this.form.validations = {
      school: [],
      month: [isRequired],
    };
  }

  init = action(() => {
    this.achievements = [];
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
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
      url: '/reports/achievements',
      query: {
        ...this.form.getValue('month') && {
          month: this.form.getValue('month').format('MM-YYYY'),
        },
        ...this.form.getValue('school') && {
          school: this.form.getValue('school'),
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.achievements = [
          { id: 1, name: 'School Ranking', children: orderBy(this.fetch.data.filter(sa => sa.achievement.level === 'SCHOOL'), ['student.schoolClass.school.name', 'position']) },
          { id: 2, name: 'Regional Ranking', children: orderBy(this.fetch.data.filter(sa => sa.achievement.level === 'REGIONAL'), ['student.schoolClass.school.region.name', 'position']) },
          { id: 3, name: 'National Ranking', children: orderBy(this.fetch.data.filter(sa => sa.achievement.level === 'NATIONAL'), ['student.schoolClass.school.company.country.name', 'position']) },
        ];
      } else {
        this.achievements = [];
      }
    });
  });
}

const studentAchievementsListService = new StudentAchievementsListService();

export default studentAchievementsListService;
