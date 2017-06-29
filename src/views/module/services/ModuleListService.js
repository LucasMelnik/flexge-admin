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
        query: {
          ...this.form.getValue('filter') && {
            name: {
              $regex: this.form.getValue('filter'),
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
        this.modules = this.fetch.data;
      } else {
        this.modules = [];
        this.total = 0;
      }
    });
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
