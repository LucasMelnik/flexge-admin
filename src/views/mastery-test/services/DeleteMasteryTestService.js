import { action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import MasteryTestListService from './MasteryTestListService';

class DeleteMasteryTestService {
  fetch = new FetchService();
  form = new FormService();

  handleRemove = action((moduleId, masteryTestId) => {
    ConfirmationDialogService.show(
      'Delete Mastery Test',
      'You are about to delete the mastery test, Do you want to continue ?',
      () => {
        this.fetch.fetch({
          url: `/modules/${moduleId}/mastery-tests/${masteryTestId}`,
          method: 'delete',
        }).then(() => {
          MasteryTestListService.handleLoad(moduleId);
        });
      });
  });
}

const deleteMasteryTestService = new DeleteMasteryTestService();

export default deleteMasteryTestService;
