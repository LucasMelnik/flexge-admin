import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';
import NotificationService from '../../../core/services/NotificationService';

class StudentAchievementsListService {
  fetch = new FetchService();
  download = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      achievements: {
        national: [],
        regional: [],
        school: [],
      },
    });
    this.form.validations = {
      school: [],
      month: [isRequired],
    };
  }

  init = action(() => {
    this.achievements = {
      national: [],
      regional: [],
      school: [],
    };
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
        this.achievements.school = orderBy(this.fetch.data.filter(sa => sa.achievement.level === 'SCHOOL'), ['student.schoolClass.school.name', 'position']);
        this.achievements.regional = orderBy(this.fetch.data.filter(sa => sa.achievement.level === 'REGIONAL'), ['student.schoolClass.school.region.name', 'position']);
        this.achievements.national = orderBy(this.fetch.data.filter(sa => sa.achievement.level === 'NATIONAL'), ['student.schoolClass.school.company.country.name', 'position']);
      } else {
        this.achievements = {
          national: [],
          regional: [],
          school: [],
        };
      }
    });
  });

  handleDownloadCertificate = action((studentAchievement) => {
    this.download.fetch({
      responseType: 'blob',
      url: `/students/${studentAchievement.student.id}/achievements/${studentAchievement.id}/certificate`,
    }).then(() => {
      if (this.download.data) {
        const link = document.createElement('a');
        const fileUrl = window.URL.createObjectURL(this.download.data);
        link.href = fileUrl;

        link.download = 'achievement_certificate.pdf';
        link.click();
        setTimeout(() => window.URL.revokeObjectURL(fileUrl), 500);
      }
    });
  });
}

const studentAchievementsListService = new StudentAchievementsListService();

export default studentAchievementsListService;
