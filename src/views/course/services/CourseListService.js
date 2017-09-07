import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

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
          window.showSuccess(`Course "${course.name}" deleted successfully.`);
          this.load();
        });
      });
  });
}

const courseListService = new CourseListService();

export default courseListService;
