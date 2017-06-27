import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class ModuleListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      modules: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
    });
  }

  init = action(() => {
    this.page = 1;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/modules',
      query: {
        page: this.page,
        size: this.rowsByPage,
        query: {
          ...this.form.getValue('status') && {
            name: {
              $regex: this.form.getValue('status'),
              $options: 'i',
            },
          },
          ...this.form.getValue('course.id') && {
            course: this.form.getValue('course.id'),
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.modules = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.modules = [];
        this.total = 0;
      }
    });
  });

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
  });

  handleRemove = action((module) => {
    ConfirmationDialogService.show(
      'Delete Module',
      `You are about to delete the module "${module.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/modules/${module.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const moduleListService = new ModuleListService();

export default moduleListService;
