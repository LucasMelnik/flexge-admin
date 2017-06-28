import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class SchoolManagerListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
      managers: [],
    });
  }

  init = action((schoolId) => {
    this.schoolId = schoolId;
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/schools/${this.schoolId}/managers`,
      query: {
        page: this.page,
        size: this.rowsByPage,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.managers = this.fetch.data;
      } else {
        this.managers = [];
        this.total = 0;
      }
    });
  });

  handleDelete = action((manager) => {
    ConfirmationDialogService.show(
      'Delete School Manager',
      `You are about to delete the school manager "${manager.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/schools/${this.schoolId}/managers/${manager.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const schoolListService = new SchoolManagerListService();

export default schoolListService;
