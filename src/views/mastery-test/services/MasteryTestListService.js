import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class MasteryTestListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      masteryTests: [],
    });
  }

  handleLoad = action((moduleId) => {
    this.fetch.fetch({
      url: `/modules/${moduleId}/mastery-tests`,
    }).then(() => {
      if (this.fetch.data) {
        this.masteryTests = this.fetch.data.map((masteryTest, index) => (
          {
            ...masteryTest,
            modulePercentageToActive: `${masteryTest.modulePercentageToActive}%`,
            deadlineTime: masteryTest.deadlineTime,
            index: index + 1,
          }
        ));
      } else {
        this.masteryTests = [];
      }
    });
  });

  handleRemove = action((moduleId, masteryTestId) => {
    ConfirmationDialogService.show(
      'Delete Mastery Test',
      'You are about to delete the mastery test, Do you want to continue ?',
      () => {
        this.fetch.fetch({
          url: `/modules/${moduleId}/mastery-tests/${masteryTestId}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification('Mastery test deleted.', 'success');
            this.handleLoad(moduleId);
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }

        });
      });
  });
}

const masteryTestListService = new MasteryTestListService();

export default masteryTestListService;
