import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class MasteryTestListService {
  fetch = new FetchService();
  fetchItems = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      masteryTests: [],
    });
  }

  handleLoad = action((moduleId) => {
    console.log(moduleId)
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
          this.handleLoad(moduleId);
        });
      });
  });
}

const masteryTestListService = new MasteryTestListService();

export default masteryTestListService;
