import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class CharacterListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      characters: [],
      filter: '',
    });
  }

  init = action(() => {
    this.characters = [];
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/characters',
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
        this.characters = this.fetch.data;
      } else {
        this.characters = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((character) => {
    ConfirmationDialogService.show(
      'Delete Character',
      `You are about to delete the Character "${character.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/characters/${character.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`Character "${character.name}" deleted successfully.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const characterListService = new CharacterListService();

export default characterListService;
