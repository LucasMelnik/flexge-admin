import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class MasteryTestListItemsService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      items: [],
    });
  }

  handleLoad = action((masteryTestId) => {
    this.fetch.fetch({
      url: `/mastery-tests/${masteryTestId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.items = this.fetch.data;
      } else {
        this.items = [];
      }
    });
  });

  handleRemove = action((masteryTestId, itemId) => {
    ConfirmationDialogService.show(
      'Delete Mastery Test',
      'You are about to delete the mastery test item, Do you want to continue ?',
      () => {
        this.fetch.fetch({
          url: `/mastery-tests/${masteryTestId}/items/${itemId}`,
          method: 'delete',
        }).then(() => {
          this.handleLoad(masteryTestId);
        });
      });
  });
}

const masteryTestListItemsService = new MasteryTestListItemsService();

export default masteryTestListItemsService;
