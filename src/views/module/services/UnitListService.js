import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class UnitListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      units: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
      filter: '',
      moduleId: null,
    });
  }

  init = action((moduleId) => {
    this.moduleId = moduleId;
    this.page = 1;
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/modules/${this.moduleId}/units`,
      query: {
        page: this.page,
        size: this.rowsByPage,
        query: {
          name: {
            $regex: this.form.getValue('filter'),
            $options: 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.units = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.units = [];
        this.total = 0;
      }
    });
  });

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
  });

  handleRemove = action((unit) => {
    ConfirmationDialogService.show(
      'Delete UnitItemsContainer.jsx',
      `You are about to delete the unit "${unit.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/modules/${unit.module.id}/units/${unit.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const unitListService = new UnitListService();

export default unitListService;
