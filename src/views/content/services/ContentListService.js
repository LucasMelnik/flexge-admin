import { action, extendObservable } from 'mobx';
import { orderBy, throttle } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

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
  }

  init = action(() => {
    this.contents = [];
    this.modules = [];
    this.units = [];
  });

  load = action(() => {
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
      if (this.fetch.data) {
        this.contents = orderBy(this.fetch.data, ['course', 'group', 'order'], ['asc', 'asc', 'asc']);
      } else {
        this.contents = [];
      }
    });
  });

  loadModules = throttle(action(() => {
    if (this.form.getValue('moduleFilter').length < 3) {
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
    if (this.form.getValue('unitFilter').length < 3) {
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
