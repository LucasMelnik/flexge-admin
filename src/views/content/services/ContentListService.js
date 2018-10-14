import { action, extendObservable } from 'mobx';
import { orderBy, throttle } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import {isRequired} from '../../../core/validations';

class ContentListService {
  fetch = new FetchService();
  fetchModules = new FetchService();
  fetchUnits = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      contents: [],
      modules: [],
      units: [],
    });
    this.form.validations = {
      module: [(value, allValues) => !allValues.unit && isRequired(value)],
      unit: [(value, allValues) => !allValues.module && isRequired(value)],
    };
  }

  init = action(() => {
    this.contents = [];
    this.modules = [];
    this.units = [];
  });

  load = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Please select a Module or Unit', 'error');
      return false;
    }
    this.fetch.fetch({
      url: '/reports/approved-content',
      query: {
        ...this.form.getValue('module') && {
          module: this.form.getValue('module'),
        },
        ...this.form.getValue('unit') && {
          unit: this.form.getValue('unit'),
        },
      },
    }).then(() => {
      this.form.submitted = false;
      if (this.fetch.data) {
        this.contents = orderBy(this.fetch.data, ['course', 'group', 'order'], ['asc', 'asc', 'asc']);
      } else {
        this.contents = [];
      }
    });
  });

  loadModules = throttle(action(() => {
    if (this.form.getValue('moduleFilter').trim().length < 3) {
      return;
    }

    this.fetchModules.fetch({
      url: '/approved-modules',
      query: {
        name: {
          $regex: this.form.getValue('moduleFilter'),
          $options: 'i',
        },
      },
    }).then(() => {
      if (this.fetchModules.data) {
        this.modules = orderBy(this.fetchModules.data, ['course.name', 'group', 'order'], ['asc', 'asc', 'asc']);
      } else {
        this.modules = [];
      }
    });
  }), 1000);

  loadUnits = throttle(action(() => {
    if (this.form.getValue('unitFilter').trim().length < 3) {
      return;
    }

    this.fetchUnits.fetch({
      url: '/approved-units',
      query: {
        name: {
          $regex: this.form.getValue('unitFilter'),
          $options: 'i',
        },
        ...this.form.getValue('module') && {
          module: this.form.getValue('module'),
        },
      },
    }).then(() => {
      if (this.fetchUnits.data) {
        this.units = orderBy(this.fetchUnits.data, ['name', 'group', 'order'], ['asc', 'asc', 'asc']);
      } else {
        this.units = [];
      }
    });
  }), 1000);
}

const contentListService = new ContentListService();

export default contentListService;
