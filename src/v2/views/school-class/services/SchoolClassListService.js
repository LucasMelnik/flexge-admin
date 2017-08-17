import { action, extendObservable, toJS } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class SchoolClassListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      classes: [],
      schoolId: null,
    });
  }

  init = action((schoolId) => {
    this.schoolId = schoolId;
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/schools/${this.schoolId}/classes/`,
    }).then(() => {
      if (this.fetch.data) {
        this.classes = this.fetch.data;
      } else {
        this.classes = [];
        this.total = 0;
      }
    });
  });

  handleDelete = action((schoolClass) => {
    ConfirmationDialogService.show(
      'Delete School Class',
      `You are about to delete the school class "${schoolClass.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/schools/${schoolClass.school}/classses/${schoolClass.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const schoolClassListService = new SchoolClassListService();

export default schoolClassListService;
