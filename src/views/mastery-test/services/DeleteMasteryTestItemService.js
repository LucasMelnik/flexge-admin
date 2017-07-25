import { action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import MasteryTestListItemsService from './MasteryTestListItemsService';

class DeleteMasteryTestItemService {
  submit = new FetchService();

  handleRemove = action((masteryTestId, itemId) => {
    ConfirmationDialogService.show(
      'Delete Mastery Test',
      'You are about to delete the mastery test item, Do you want to continue ?',
      () => {
        this.submit.fetch({
          url: `/mastery-tests/${masteryTestId}/items/${itemId}`,
          method: 'delete',
        }).then(() => {
          MasteryTestListItemsService.handleLoad(masteryTestId);
        });
      });
  });
}

const deleteMasteryTestItemService = new DeleteMasteryTestItemService();

export default deleteMasteryTestItemService;
