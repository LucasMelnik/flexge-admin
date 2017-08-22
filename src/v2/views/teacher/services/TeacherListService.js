import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class TeacherListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      teachers: [],
      filter: '',
    });
  }

  init = action(() => {
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/teachers',
      query: {
        query: {
          name: {
            $regex: this.form.getValue('filter'),
            $options: 'i',
          },
          ...this.form.getValue('company') && {
            company: this.form.getValue('company'),
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.teachers = this.fetch.data;
      } else {
        this.teachers = [];
      }
    });
  });

  handleRemove = action((teacher) => {
    ConfirmationDialogService.show(
      'Delete Teacher',
      `You are about to delete the teacher "${teacher.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/teachers/${teacher.id}`,
          method: 'delete',
        }).then(() => {
          window.showSuccess(`Teacher "${teacher.name}" deleted successfully.`);
          this.load();
        });
      });
  });
}

const teacherListService = new TeacherListService();

export default teacherListService;
