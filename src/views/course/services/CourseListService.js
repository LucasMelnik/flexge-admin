import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class CourseListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      courses: [],
      filter: '',
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/courses',
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
        this.courses = this.fetch.data;
      } else {
        this.courses = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((course) => {
    ConfirmationDialogService.show(
      'Delete Course',
      `You are about to delete the Course "${course.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/courses/${course.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`Course "${course.name}" deleted successfully.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const courseListService = new CourseListService();

export default courseListService;
