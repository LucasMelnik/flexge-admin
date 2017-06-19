import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class UnitItemFormService {
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      successCallback: null,
    });
  }

  init = action((successCallback) => {
    this.successCallback = successCallback;
  });

  handleLinkToUnit = action((unitItem) => {
    this.submit.fetch({
      method: 'post',
      url: `/units/${unitItem.unit}/items/${unitItem.item}/unit-item`,
      body: {
        order: unitItem.order,
      },
    }).then(() => {
      if (this.submit.data) {
        const item = this.submit.data;
        if (this.successCallback) {
          this.successCallback(item);
        }
      }
      if (this.submit.error) {
        console.log('error on link unit to item', this.submit.error);
      }
    });
  })
}

const unitItemFormService = new UnitItemFormService();

export default unitItemFormService;
