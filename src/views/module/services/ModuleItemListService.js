import { action, extendObservable } from 'mobx';
import { orderBy } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class ModuleItemListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      items: [],
      unitItemsCount: 1,
      moduleId: null,
      unitId: null,
    });
  }

  init = action((moduleId, unitId) => {
    this.moduleId = moduleId;
    this.unitId = unitId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/modules/${this.moduleId}/items`,
      query: {
       ...this.form.getValues(),
        grammar: this.form.getValue('grammar').id,
        type: this.form.getValue('type').id,
      },
    }).then(() => {
      const moduleItems = orderBy(this.fetch.data, ['type.name'], ['asc']);

      if (this.fetch.data) {
        this.fetch.fetch({
          url: `/units/${this.unitId}/items`,
        }).then(() => {
          if (this.fetch.data) {
            this.unitItemsCount = this.fetch.data.length;
            this.items = moduleItems.filter(item => !this.fetch.data.find(unitItem => item.id === unitItem.item.id));
          } else {
            this.items = moduleItems;
          }
        });
      } else {
        this.items = [];
      }
    });
  });

  handleLinkToUnit = action((item) => {
    this.submit.fetch({
      method: 'post',
      url: `/units/${this.unitId}/items/${item.id}`,
      body: {
        order: this.unitItemsCount,
      },
    }).then(() => {
      this.unitItemsCount = this.unitItemsCount + 1;
    });
  });
}

const moduleItemListService = new ModuleItemListService();

export default moduleItemListService;
