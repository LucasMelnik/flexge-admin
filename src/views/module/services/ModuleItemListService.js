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
      moduleId: null,
    });
  }

  init = action((moduleId) => {
    this.moduleId = moduleId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/modules/${this.moduleId}/items`,
      query: {
        query: {
         ...this.form.getValues(),
        }
      },
    }).then(() => {
      if (this.fetch.data) {
        this.items = orderBy(this.fetch.data, ['type.name'], ['asc']);
      } else {
        this.items = [];
      }
    });
  });

  // handleLinkToUnit = action((item) => {
  //   this.submit.fetch({
  //     method: 'post',
  //     url: `/units/${this.unitId}/items/${item.id}`,
  //     body: {
  //       order: unitItem.order,
  //     },
  //   }).then(() => {
  //     if (this.submit.data) {
  //       const item = this.submit.data;
  //       if (this.successCallback) {
  //         this.successCallback(item);
  //       }
  //     }
  //     if (this.submit.error) {
  //       console.log('error on link unit to item', this.submit.error);
  //     }
  //   });
  // });
}

const moduleItemListService = new ModuleItemListService();

export default moduleItemListService;
