import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class SchoolClassListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      classes: [],
      schoolId: null,
      filter: '',
    });
  }

  init = action((schoolId) => {
    this.schoolId = schoolId;
    this.filter = '';
    if (!schoolId) {
      this.loadAllClasses();
    } else {
      this.loadClassesBySchool();
    }
  });

  loadAllClasses = action(() => {
    this.fetch.fetch({
      url: '/classes',
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
        this.classes = this.fetch.data;
      }
    });
  });

  loadClassesBySchool = action(() => {
    this.fetch.fetch({
      url: `/schools/${this.schoolId}/classes`,
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
        this.classes = this.fetch.data;
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    if (!this.schoolId) {
      this.loadAllClasses();
    } else {
      this.loadClassesBySchool();
    }
  });

  handleDelete = action((schoolClass) => {
    ConfirmationDialogService.show(
      'Delete School Class',
      `You are about to delete the school class "${schoolClass.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/schools/${schoolClass.school.id}/classes/${schoolClass.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification('Class deleted successfully.', 'success');
            this.schoolId = schoolClass.school.id;
            this.loadClassesBySchool();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const schoolClassListService = new SchoolClassListService();

export default schoolClassListService;
