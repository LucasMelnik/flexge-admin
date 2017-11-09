import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class AchievementFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      achievementId: null,
    });
    this.form.validations = {
      type: [isRequired],
      level: [isRequired],
    };
  }

  handleLoad = action((achievementId) => {
    this.form.reset();
    if (achievementId) {
      this.fetch.fetch({
        url: `/achievements/${achievementId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.achievementId = achievementId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification(
        'Fill the required fields',
        null,
        null,
        'error',
      );
      return;
    }
    const achievementId = this.form.getValue('id');
    this.submit.fetch({
      method: achievementId ? 'put' : 'post',
      url: achievementId ? `/achievements/${achievementId}` : '/achievements',
      body: this.form.getValues(),
    }).then(() => {
      if (this.submit.data) {
        const achievement = this.submit.data;
        browserHistory.push(`/achievements/${achievement.id}`);
        this.achievementId = achievement.id;
        this.form.reset();
        this.form.setInitialValues(achievement);
        NotificationService.addNotification(
          `Achievement ${achievementId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${achievementId ? 'updating' : 'creating'} achievement.`,
          null,
          null,
          'error',
        );
      }
    });
  })
}

const achievementFormService = new AchievementFormService();

export default achievementFormService;
