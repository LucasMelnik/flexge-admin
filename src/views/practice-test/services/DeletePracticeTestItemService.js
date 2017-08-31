import { action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import PracticeTestListItemsService from './PracticeTestListItemsService';

class DeletePracticeTestItemService {
  submit = new FetchService();

  handleRemove = action((practiceTestItem) => {
    ConfirmationDialogService.show(
      'Delete Practice Test Item',
      `You are about to delete the practice test "Order: ${practiceTestItem.order} - ${practiceTestItem.item.text}", Do you want to continue ?`,
      () => {
        this.submit.fetch({
          url: `/mastery-tests/${practiceTestItem.masteryTest}/items/${practiceTestItem.item.id}`,
          method: 'delete',
        }).then(() => {
          PracticeTestListItemsService.handleLoad(practiceTestItem.masteryTest);
        });
      });
  });
}

const deletePracticeTestItemService = new DeletePracticeTestItemService();

export default deletePracticeTestItemService;
