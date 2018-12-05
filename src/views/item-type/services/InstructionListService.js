import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class InstructionListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      instructions: [],
      itemTypeId: null,
    });
  }

  init = action((itemTypeId) => {
    this.instructions = [];
    this.itemTypeId = itemTypeId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/item-types/${this.itemTypeId}/instructions`,
    }).then(() => {
      if (this.fetch.data) {
        this.instructions = this.fetch.data;
      } else {
        this.instructions = [];
      }
    });
  });

  handleRemove = action((instruction) => {
    ConfirmationDialogService.show(
      'Delete Item Type Instruction',
      `You are about to delete the Instruction "${instruction.text}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/item-types/${this.itemTypeId}/instructions/${instruction.id}`,
          method: 'delete',
        }).then(() => {
          NotificationService.addNotification(`Instruction"${instruction.text}" deleted successfully.`, 'success');
          this.load();
        });
      });
  });
}

const instructionListService = new InstructionListService();

export default instructionListService;
