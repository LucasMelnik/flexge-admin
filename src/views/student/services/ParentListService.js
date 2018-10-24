import {action, extendObservable} from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class ParentListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      parents: [],
      studentId: null,
    });
  }

  init = action((studentId) => {
    this.parents = [];
    this.studentId = studentId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/students/${this.studentId}/parents`,
    }).then(() => {
      if (this.fetch.data) {
        this.parents = this.fetch.data;
      } else {
        this.parents = [];
      }
    });
  });

  handleDelete = action((parent) => {
    ConfirmationDialogService.show(
      'Delete Parent',
      `You are about to remove the student parent "${parent.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/students/${this.studentId}/parents/${parent.id}`,
          method: 'delete',
        }).then(() => {
          NotificationService.addNotification('Student parent removed', 'success');
          this.load();
        });
      },
    );
  });
}

const parentListService = new ParentListService();

export default parentListService;
