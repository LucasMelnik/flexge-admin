import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';
import debounce from 'lodash/debounce';

class SchoolClassListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      classes: [],
      schoolId: null,
      filter: '',
      pagination: {
        current: 1,
        total: 0,
        pageSize: 50,
      },
    });
  }

  init = action((schoolId) => {
    this.classes = [];
    this.filter = '';
    this.schoolId = schoolId;
    this.filter = '';
    this.loadClassesBySchool();
  });

  loadClassesBySchool = action((pagination) => {
    if (pagination) {
      this.pagination.current = pagination.current;
    } else {
      this.pagination.current = 1;
    }

    this.fetch.fetch({
      url: `/schools/${this.schoolId}/classes`,
      query: {
        page: this.pagination.current,
        size: this.pagination.pageSize,
        query: this.filter && {
          name: {
            $regex: this.filter,
            $options: 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.classes = this.fetch.data.docs;
        this.pagination.total = this.fetch.data.total;
      }
    });
  });

  handleDebounceLoad = debounce(action(() => {
    this.loadClassesBySchool();
  }), 1000);

  handleFilterChange = action((value) => {
    this.filter = value;
    this.handleDebounceLoad();
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
