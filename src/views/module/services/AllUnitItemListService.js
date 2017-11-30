import { action, extendObservable } from 'mobx';
import { orderBy } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class AllUnitItemListService {
  fetch = new FetchService();
  submit = new FetchService();
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
    this.items = [];
    this.moduleId = moduleId;
    this.unitId = unitId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/modules/${this.moduleId}/unit-items`,
      query: {
       ...this.form.getValues(),
        grammar: this.form.getValue('grammar').id,
        type: this.form.getValue('type').id,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.items = orderBy(this.fetch.data, ['type.name'], ['asc']);
        this.removeSelectedItems();
      } else {
        this.items = [];
      }
    });
  });

  removeSelectedItems = action(() => {
    this.fetch.fetch({
      url: `/units/${this.unitId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        if (this.fetch.data.length) {
          this.unitItemsCount = this.fetch.data.length;
        }
        this.items = this.items.filter(unitItemInReview => !this.fetch.data.find(unitItem => unitItemInReview.item.id === unitItem.item.id));
      }
    });
  });

  handleLinkToUnit = action((unitItem) => {
    this.submit.fetch({
      method: 'post',
      url: `/units/${this.unitId}/items/${unitItem.item.id}`,
      body: {
        order: this.unitItemsCount + 1,
        group: 1,
      },
    }).then(() => {
      this.removeSelectedItems();
    });
  });
}

const allUnitItemListService = new AllUnitItemListService();

export default allUnitItemListService;
