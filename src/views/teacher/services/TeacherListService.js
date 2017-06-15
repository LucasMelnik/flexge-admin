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
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
      filter: '',
    });
  }

  init = action(() => {
    this.page = 1;
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/teachers',
      query: {
        page: this.page,
        size: this.rowsByPage,
        query: {
          name: {
            $regex: this.form.getValue('filter'),
            $options: 'i',
          },
          company: this.form.getValue('company').id,
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.teachers = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.page = this.fetch.data.page;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.teachers = [];
        this.total = 0;
        this.page = 1;
        this.pageCount = 1;
      }
    });
  });

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
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
          this.load();
        });
      });
  });
}

const teacherListService = new TeacherListService();

export default teacherListService;
