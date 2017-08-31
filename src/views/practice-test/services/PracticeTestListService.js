import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class PracticeTestListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      practiceTests: [],
    });
  }

  handleLoad = action(() => {
    this.fetch.fetch({
      url: '/practice-tests',
    }).then(() => {
      if (this.fetch.data) {
        this.practiceTests = this.fetch.data.map((practiceTest, index) => (
          {
            ...practiceTest,
            index: index + 1,
          }
        ));
      } else {
        this.practiceTests = [];
      }
    });
  });

  handleRemove = action((practiceTestId) => {
    ConfirmationDialogService.show(
      'Delete Practice Test',
      'You are about to delete the practice test, Do you want to continue ?',
      () => {
        this.fetch.fetch({
          url: `/practice-tests/${practiceTestId}`,
          method: 'delete',
        }).then(() => {
          this.handleLoad();
        });
      });
  });
}

const practiceTestListService = new PracticeTestListService();

export default practiceTestListService;
