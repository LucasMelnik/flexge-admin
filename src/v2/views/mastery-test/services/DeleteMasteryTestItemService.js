import { action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import MasteryTestListItemsService from './MasteryTestListItemsService';

class DeleteMasteryTestItemService {
  submit = new FetchService();

  handleRemove = action((masteryTestItem) => {
    ConfirmationDialogService.show(
      'Delete Mastery Test Item',
      `You are about to delete the mastery test "Order: ${masteryTestItem.order} - ${masteryTestItem.item.text}", Do you want to continue ?`,
      () => {
        this.submit.fetch({
          url: `/mastery-tests/${masteryTestItem.masteryTest}/items/${masteryTestItem.item.id}`,
          method: 'delete',
        }).then(() => {
          MasteryTestListItemsService.handleLoad(masteryTestItem.masteryTest);
        });
      });
  });
}

const deleteMasteryTestItemService = new DeleteMasteryTestItemService();

export default deleteMasteryTestItemService;
