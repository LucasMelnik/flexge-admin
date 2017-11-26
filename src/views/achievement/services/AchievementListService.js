import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class AchievementListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      achievements: [],
      filter: '',
    });
  }

  init = action(() => {
    this.achievements = [];
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/achievements',
      query: {
        query: this.filter && {
          name: {
            $regex: this.filter,
            $options: 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.achievements = this.fetch.data;
      } else {
        this.achievements = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((achievement) => {
    ConfirmationDialogService.show(
      'Delete Achievement',
      `You are about to delete the achievement "${achievement.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/achievements/${achievement.id}`,
          method: 'delete',
        }).then(() => {
          NotificationService.addNotification(`Achievement "${achievement.name}" deleted successfully.`, 'success');
          this.load();
        });
      });
  });
}

const achievementListService = new AchievementListService();

export default achievementListService;
